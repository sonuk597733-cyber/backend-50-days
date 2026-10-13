
import React, { useState, useEffect, useRef } from 'react';

const From = () => {
  const [activeTab, setActiveTab] = useState('login');

  const [form, setForm] = useState({
    username: '',
    email: '',
    bio: ''
  });

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [openMenu, setOpenMenu] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const menuRef = useRef(null);

  // Dropdown ke bahar click karne par hide
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setOpenMenu(null);
      }
    };

    document.addEventListener('pointerdown', handleClickOutside);

    return () => {
      document.removeEventListener(
        'pointerdown',
        handleClickOutside
      );
    };
  }, []);

  // GET: Fetch all profiles
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch('/api/profile');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Users load nahi hue');
      }

      setUsers(Array.isArray(data.users) ? data.users : []);
    } catch (err) {
      setError(err.message || 'Server se connect nahi ho paya');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'users') {
      fetchUsers();
    }
  }, [activeTab]);

  // Input handling
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // CREATE and UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError('');

      const isEditing = Boolean(editingId);

      const url = isEditing
        ? `/api/profile/${editingId}`
        : '/api/profile';

      const response = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Profile save nahi hua');
      }

      if (isEditing) {
        // Updated profile ko list mein replace karo
        setUsers((prev) =>
          prev.map((user) =>
            user._id === editingId ? data.user : user
          )
        );

        alert('Profile updated successfully!');
      } else {
        // New profile ko list mein add karo
        setUsers((prev) => [...prev, data.user]);

        alert('Profile created successfully!');
      }

      resetForm();
      setActiveTab('users');
    } catch (err) {
      console.error('Save error:', err);
      alert(err.message || 'Kuch galat ho gaya');
    } finally {
      setSaving(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setForm({
      username: '',
      email: '',
      bio: ''
    });

    setEditingId(null);
  };

  // EDIT
  const handleEdit = (user) => {
    setForm({
      username: user.username || '',
      email: user.email || '',
      bio: user.bio || ''
    });

    setEditingId(user._id);
    setOpenMenu(null);
    setActiveTab('login');
  };

  // DELETE
  
const handleDelete = async (id) => {
  if (!window.confirm('Kya profile delete karni hai?')) return;

  try {
    const response = await fetch(`/api/profile/${id}`, {
      method: 'DELETE'
    });

    const text = await response.text();

    let data;

    try {
      data = JSON.parse(text);
    } catch {
      throw new Error(
        `Server ne JSON ke badle HTML/text bheja. HTTP status: ${response.status}. Backend URL aur proxy check karo.`
      );
    }

    if (!response.ok) {
      throw new Error(data.message || 'Delete failed');
    }

    setUsers((prev) => prev.filter((user) => user._id !== id));
    setOpenMenu(null);

    alert('Profile deleted successfully!');
  } catch (err) {
    console.error('Delete error:', err);
    alert(err.message);
  }
};


  return (
    <div className="app-container">

      {/* Navbar */}
      <nav className="navbar">
        <h2 className="logo">MyProfile</h2>

        <div className="nav-links">
          <button
            type="button"
            className={
              activeTab === 'login' ? 'nav-btn active' : 'nav-btn'
            }
            onClick={() => {
              setOpenMenu(null);
              setActiveTab('login');
            }}
          >
            {editingId ? 'Edit Profile' : 'Create Profile'}
          </button>

          <button
            type="button"
            className={
              activeTab === 'users' ? 'nav-btn active' : 'nav-btn'
            }
            onClick={() => {
              setOpenMenu(null);
              setActiveTab('users');
            }}
          >
            Users
          </button>
        </div>
      </nav>

      {/* CREATE / EDIT FORM */}
      {activeTab === 'login' && (
        <main className="parent">
          <form className="register-form" onSubmit={handleSubmit}>
            <h2>{editingId ? 'Edit Profile' : 'Create Profile'}</h2>

            <p className="subtitle">
              {editingId
                ? 'Update your profile details'
                : 'Enter your details to get started'}
            </p>

            <label htmlFor="username">Name</label>
            <input
              id="username"
              type="text"
              name="username"
              placeholder="Enter your Name"
              value={form.username}
              onChange={handleChange}
              required
            />

            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your Email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              name="bio"
              placeholder="Tell us something about yourself..."
              rows={3}
              value={form.bio}
              onChange={handleChange}
            />

            <button type="submit" disabled={saving}>
              {saving
                ? 'Please wait...'
                : editingId
                  ? 'Update Profile'
                  : 'Create Profile →'}
            </button>

            {editingId && (
              <button
                type="button"
                className="cancel-btn"
                onClick={() => {
                  resetForm();
                  setActiveTab('users');
                }}
              >
                Cancel Edit
              </button>
            )}
          </form>
        </main>
      )}

      {/* USERS LIST */}
      {activeTab === 'users' && (
        <section className="users-section">
          <div className="users-heading">
            <div>
              <h2>Saved Users</h2>
              <p>Manage your saved profiles</p>
            </div>

            <button
              type="button"
              className="add-user-btn"
              onClick={() => {
                resetForm();
                setOpenMenu(null);
                setActiveTab('login');
              }}
            >
              + Add User
            </button>
          </div>

          {loading && <p>Loading users...</p>}

          {error && (
            <div className="error-message">
              <p>{error}</p>
              <button type="button" onClick={fetchUsers}>
                Retry
              </button>
            </div>
          )}

          {!loading && !error && users.length === 0 && (
            <p className="empty-message">No users found.</p>
          )}

          <div className="users-grid">
            {users.map((user) => (
              <article className="profile-card" key={user._id}>
                {/* Three-dot dropdown */}
                <div
                  className="card-menu"
                  ref={openMenu === user._id ? menuRef : null}
                >
                  <button
                    type="button"
                    className="three-dots"
                    aria-label="Profile options"
                    aria-expanded={openMenu === user._id}
                    onClick={() => {
                      setOpenMenu((current) =>
                        current === user._id ? null : user._id
                      );
                    }}
                  >
                    ⋮
                  </button>

                  {openMenu === user._id && (
                    <div className="dropdown-menu">
                      <button
                        type="button"
                        onClick={() => handleEdit(user)}
                      >
                        ✏️ Edit
                      </button>

                      <button
                        type="button"
                        className="delete-option"
                        onClick={() => {
                          setOpenMenu(null);
                          handleDelete(user._id);
                        }}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  )}
                </div>

                <div className="profile-avatar">
                  {(user.username || 'U').charAt(0).toUpperCase()}
                </div>

                <h3>{user.username}</h3>

                <p>
                  <strong>Email:</strong> {user.email}
                </p>

                <p className="user-bio">
                  <strong>Bio:</strong> {user.bio || 'Bio not available'}
                </p>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default From;
