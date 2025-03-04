import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css"; // Import custom CSS

const API_URL = "https://localhost:7299";

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

function StudentCrud() {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [course, setCourse] = useState("");
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        Load();
    }, []);

    async function Load() {
        setLoading(true);
        try {
            const result = await axiosInstance.get("/api/Student/GetStudent");
            setStudents(result.data);
        } catch (err) {
            setError("Failed to load students.");
        } finally {
            setLoading(false);
        }
    }

    async function save(event) {
        event.preventDefault();
        try {
            await axiosInstance.post("/api/Student/AddStudent", { name, course });
            alert("Student added successfully!");
            resetForm();
            Load();
        } catch (err) {
            setError(err.message || "Failed to add student.");
        }
    }

    async function editStudent(student) {
        setName(student.name);
        setCourse(student.course);
        setId(student.id);
    }

    async function DeleteStudent(id) {
        try {
            await axiosInstance.delete(`/api/Student/DeleteStudent/${id}`);
            alert("Student deleted successfully!");
            resetForm();
            Load();
        } catch (err) {
            setError(err.message || "Failed to delete student.");
        }
    }

    async function update(event) {
        event.preventDefault();
        try {
            await axiosInstance.patch(`/api/Student/UpdateStudent/${id}`, { id, name, course });
            alert("Record updated successfully!");
            resetForm();
            Load();
        } catch (err) {
            setError(err.message || "Failed to update student.");
        }
    }

    const resetForm = () => {
        setId("");
        setName("");
        setCourse("");
    };

    return (
        <div className="container mt-5">
            <h1>Student Details</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <form className="border p-4 rounded shadow-sm bg-light">
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Student Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="course" className="form-label">
                                Course
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="course"
                                value={course}
                                onChange={(e) => setCourse(e.target.value)}
                                required
                            />
                        </div>
                        <div className="d-flex justify-content-between">
                            <button
                                className="btn btn-success"
                                onClick={save}
                                disabled={!name || !course || loading}
                            >
                                {loading ? "Adding..." : "Add"}
                            </button>
                            <button
                                className="btn btn-warning"
                                onClick={update}
                                disabled={!id || loading}
                            >
                                {loading ? "Updating..." : "Update"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="mt-5">
                <h2>Student List</h2>
                {loading ? (
                    <div className="text-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <table className="table table-striped table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Course</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => (
                                <tr key={student.id}>
                                    <td>{student.id}</td>
                                    <td>{student.name}</td>
                                    <td>{student.course}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-warning me-2"
                                            onClick={() => editStudent(student)}
                                        >
                                            ✏️ Edit
                                        </button>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => {
                                                if (window.confirm("Are you sure you want to delete this student?")) {
                                                    DeleteStudent(student.id);
                                                }
                                            }}
                                        >
                                            🗑️ Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default StudentCrud;