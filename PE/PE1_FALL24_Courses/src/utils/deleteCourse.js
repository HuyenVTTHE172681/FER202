import axios from "axios";

export const deleteCourse = async (id, setCourses) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this course?");

    if (!confirmDelete) {
        return;
    }
    
    try {
        await axios.delete(`http://localhost:9999/courses/${id}`);
        setCourses((prevCourses) => prevCourses.filter((course) => course.id !== id));
        alert("Course deleted successfully!");
    } catch (error) {
        console.log(error.message);
        alert("Failed to delete course.");
    }
}