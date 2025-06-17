import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import axios from 'axios';

const CourseDialog = ({ isOpen, onClose, courseId }) => {
  const [formData, setFormData] = useState({
    course: '',
    module: '',
    topic: '',
    websiteLink: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (courseId && isOpen) {
      fetchCourseData();
    }
  }, [courseId, isOpen]);

  const fetchCourseData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/courses/${courseId}/`);
      setFormData(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch course data');
      console.error('Error fetching course:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.put(`/api/courses/${courseId}/`, formData);
      onClose();
      setError(null);
    } catch (err) {
      setError('Failed to update course');
      console.error('Error updating course:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-10 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <div className="relative bg-white rounded-lg max-w-md w-full mx-4 p-6 shadow-xl">
          <Dialog.Title className="text-lg font-medium text-gray-900 mb-4">
            Edit Course
          </Dialog.Title>

          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Course
              </label>
              <input
                type="text"
                name="course"
                value={formData.course}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Module
              </label>
              <input
                type="text"
                name="module"
                value={formData.module}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Topic
              </label>
              <input
                type="text"
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Website Link
              </label>
              <input
                type="url"
                name="websiteLink"
                value={formData.websiteLink}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
};

export default CourseDialog; 