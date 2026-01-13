// useState lets us st6ore and update the form input values
import { useState } from "react";
// this is a component the renders the saved countries page..
// the const formData stores all the the input values into 1 object..
// each key "" matches the inputs name attribute...
function SavedCountries() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        country: "",
        bio: "",
    });
    // this function runs everytime the user types in the input..
    // the setFormData..updates only when being changed, when the form data stays the same..
    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }
    // this function runs when the form is submitted...
    // the e.prevent stops page from refreshing
    function handleSubmit(e) {
        e.preventDefault();
// this just resets the form after was submitted
        setFormData({
            fullName: "",
            email: "",
            country: "",
            bio: "",
        });
    }
    // this is the jsx that returns what to be displayed on page..
    return (
        <main className="page">
            <h3 className="page-title">My Saved Countries</h3>
            <section className="saved-layout">
                <div className="profile-card">
                    <h2 className="section-title">My Profile</h2>
                    <form className="profile-form" onSubmit={handleSubmit}>
                        <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange}/>
                        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange}/>
                    <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange}/>
                    <textarea name="bio" placeholder="Bio" rows="6" value={formData.bio} onChange={handleChange}/>
                    <button className="submit-btn" type="submit">Submit</button>
                    </form>
                </div>
            </section>
        </main>
    );
}

// export so the app.jsx can use this page
export default SavedCountries;