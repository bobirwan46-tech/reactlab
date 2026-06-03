import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import Modal from "../components/ui/Modal";
import LabCard from "../components/ui/LabCard";
import Drawer from "../components/ui/Drawer";
import { useFetch } from "../hooks/useFetch";

export default function Lab() {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [previewText, setPreviewText] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [drawerPost, setDrawerPost] = useState(null);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [postLoading, setPostLoading] = useState(false);
  const [postSuccess, setCreatedPost] = useState(null);
  const [postError, setPostError] = useState("");




  const [customerForm, setCustomerForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
  });

  const [formError, setFormError] = useState("");
  const [submittedCustomer, setSubmittedCustomer] = useState(null);
  const [customerRecords, setCustomerRecords] = useState([]);
  const [editingCustomerId, setEditingCustomerId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [tasks, setTasks] = useState([
    "Learn Components",
    "Understand Props",
  ]);

  const [taskInput, setTaskInput] = useState("");

  const {
    data: posts,
    loading,
    error,
  } = useFetch("https://jsonplaceholder.typicode.com/posts?_limit=6");

  useEffect(() => {
    const savedCustomer = localStorage.getItem("submittedCustomer");
    const savedRecords = localStorage.getItem("customerRecords");

    if (savedCustomer) {
      setSubmittedCustomer(JSON.parse(savedCustomer));
    }

    if (savedRecords) {
      setCustomerRecords(JSON.parse(savedRecords));
    }
  }, []);

  function handleCustomerFormChange(event) {
    const { name, value } = event.target;

    setCustomerForm({
      ...customerForm,
      [name]: value,
    });
  }

  function handleCustomerFormSubmit(event) {
    event.preventDefault();

    if (
      customerForm.fullName.trim() === "" ||
      customerForm.email.trim() === "" ||
      customerForm.phone.trim() === "" ||
      customerForm.country.trim() === ""
    ) {
      setFormError("Please complete all fields before submitting.");
      return;
    }

    if (!customerForm.email.includes("@")) {
      setFormError("Please enter a valid email address.");
      return;
    }

    if (!/^\d+$/.test(customerForm.phone)) {
      setFormError("Phone number should contain only digits.");
      return;
    }

    if (editingCustomerId) {
      const updatedRecords = customerRecords.map((customer) =>
        customer.id === editingCustomerId
          ? {
              ...customer,
              ...customerForm,
            }
          : customer
      );

      setCustomerRecords(updatedRecords);
      setSubmittedCustomer(customerForm);
      setEditingCustomerId(null);
      setIsEditModalOpen(false);

      localStorage.setItem(
        "customerRecords",
        JSON.stringify(updatedRecords)
      );

      localStorage.setItem(
        "submittedCustomer",
        JSON.stringify(customerForm)
      );
    } else {
      const newCustomer = {
        id: Date.now(),
        ...customerForm,
      };

      const updatedRecords = [newCustomer, ...customerRecords];

      setCustomerRecords(updatedRecords);
      setSubmittedCustomer(customerForm);

      localStorage.setItem(
        "customerRecords",
        JSON.stringify(updatedRecords)
      );

      localStorage.setItem(
        "submittedCustomer",
        JSON.stringify(customerForm)
      );
    }

    setFormError("");

    setCustomerForm({
      fullName: "",
      email: "",
      phone: "",
      country: "",
    });
  }

  function handleEditCustomer(customer) {
    setEditingCustomerId(customer.id);

    setCustomerForm({
      fullName: customer.fullName,
      email: customer.email,
      phone: customer.phone,
      country: customer.country,
    });

    setIsEditModalOpen(true);
  }

  function handleDeleteCustomer(customerId) {
    const updatedRecords = customerRecords.filter(
      (customer) => customer.id !== customerId
    );

    setCustomerRecords(updatedRecords);

    localStorage.setItem(
      "customerRecords",
      JSON.stringify(updatedRecords)
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="mb-10">
        <p className="text-sm font-semibold text-blue-600">
          Lab Playground
        </p>

        <h1 className="mt-3 text-4xl font-bold text-slate-900">
          Practise React interactively.
        </h1>

        <p className="mt-4 max-w-2xl text-slate-600">
          Experiment with state, events, rendering, animation, and API fetching
          in small focused labs.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <LabCard
          label="Counter Lab"
          title="Learn useState with a counter."
          description="Click the buttons to update state."
        >
          <motion.div
            key={count}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-8 flex h-32 items-center justify-center rounded-2xl bg-blue-50 text-5xl font-bold text-blue-600"
          >
            {count}
          </motion.div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setCount(count + 1)}
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Increase
            </button>

            <button
              onClick={() => setCount(count - 1)}
              className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Decrease
            </button>

            <button
              onClick={() => setCount(0)}
              className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              Reset
            </button>
          </div>
        </LabCard>

        <LabCard
          label="Toggle Lab"
          title="Learn conditional rendering."
          description="Click the button to show or hide the message."
        >
          <button
            onClick={() => setIsVisible(!isVisible)}
            className="rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white hover:bg-purple-700"
          >
            {isVisible ? "Hide Message" : "Show Message"}
          </button>

          {isVisible && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 rounded-2xl bg-purple-50 p-5 text-sm font-medium text-purple-700"
            >
              This message is visible because isVisible is true.
            </motion.div>
          )}
        </LabCard>

        <LabCard
          label="Live Preview Lab"
          title="Learn controlled inputs."
          description="Type into the input and React updates the preview instantly."
        >
          <input
            type="text"
            value={previewText}
            onChange={(event) => setPreviewText(event.target.value)}
            placeholder="Type something..."
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100"
          />

          <div className="mt-6 rounded-2xl bg-green-50 p-5 text-sm font-medium text-green-700">
            {previewText || "Your preview will appear here."}
          </div>
        </LabCard>

        <LabCard
          label="Dynamic List Lab"
          title="Learn array state and .map()"
          description="Add and remove tasks dynamically using React state arrays."
        >
          <div className="flex gap-3">
            <input
              type="text"
              value={taskInput}
              onChange={(event) => setTaskInput(event.target.value)}
              placeholder="Add new task..."
              className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
            />

            <button
              onClick={() => {
                if (taskInput.trim() === "") return;

                setTasks([...tasks, taskInput]);
                setTaskInput("");
              }}
              className="rounded-xl bg-orange-600 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-700"
            >
              Add
            </button>
          </div>

          <div className="mt-6 space-y-3">
            {tasks.map((task, index) => (
              <motion.div
                key={`${task}-${index}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between rounded-xl bg-orange-50 px-4 py-3"
              >
                <p className="text-sm font-medium text-orange-700">
                  {task}
                </p>

                <button
                  onClick={() =>
                    setTasks(tasks.filter((_, i) => i !== index))
                  }
                  className="text-sm font-semibold text-red-500 hover:text-red-600"
                >
                  Delete
                </button>
              </motion.div>
            ))}
          </div>
        </LabCard>

        <LabCard
          label="API Fetching Lab"
          title="Learn useEffect and API data."
          description="Fetch remote data and render loading, error, and success states."
        >
          {loading && (
            <p className="rounded-xl bg-blue-50 p-4 text-sm font-medium text-blue-700">
              Loading posts...
            </p>
          )}

          {error && (
            <p className="rounded-xl bg-red-50 p-4 text-sm font-medium text-red-700">
              {error}
            </p>
          )}

          {!loading && !error && (
            <div className="space-y-4">
              {posts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5, scale: 1.01 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  }}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:border-blue-300 hover:shadow-xl"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-[11px] font-semibold text-blue-700">
                      User {post.userId}
                    </span>

                    <span className="text-xs font-medium text-slate-400">
                      Post #{post.id}
                    </span>
                  </div>

                  <h3 className="line-clamp-2 text-sm font-bold leading-6 text-slate-900">
                    {post.title}
                  </h3>

                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                    {post.body}
                  </p>

                  <button
                    type="button"
                    onClick={() => setSelectedPost(post)}
                    className="mt-5 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-colors group-hover:bg-blue-600"
                  >
                    View API Record
                  </button>

                  <button
                    type="button"
                    onClick={() => setDrawerPost(post)}
                    className="mt-3 block w-full rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                  >
                    Open Drawer
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </LabCard>

        <LabCard
          label="Form Lab"
          title="Learn React forms."
          description="Submit customer details using controlled inputs and validation."
        >
          <form onSubmit={handleCustomerFormSubmit} className="space-y-4">
            <input
              type="text"
              name="fullName"
              value={customerForm.fullName}
              onChange={handleCustomerFormChange}
              placeholder="Full name"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />

            <input
              type="email"
              name="email"
              value={customerForm.email}
              onChange={handleCustomerFormChange}
              placeholder="Email address"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />

            <input
              type="text"
              name="phone"
              value={customerForm.phone}
              onChange={handleCustomerFormChange}
              placeholder="Phone number"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />

            <select
              name="country"
              value={customerForm.country}
              onChange={handleCustomerFormChange}
              className="h-[48px] w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            >
              <option value="">Select country</option>
              <option value="Brunei">Brunei</option>
              <option value="Singapore">Singapore</option>
              <option value="Malaysia">Malaysia</option>
              <option value="Indonesia">Indonesia</option>
            </select>

            {formError && (
              <p className="rounded-xl bg-red-50 p-4 text-sm font-medium text-red-700">
                {formError}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Submit Customer
            </button>
          </form>

          {submittedCustomer && (
            <div className="mt-6 rounded-2xl bg-green-50 p-5 text-sm text-green-700">
              <p className="font-semibold">
                Customer submitted successfully:
              </p>

              <pre className="mt-3 overflow-x-auto text-xs">
                {JSON.stringify(submittedCustomer, null, 2)}
              </pre>
            </div>
          )}
        </LabCard>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm lg:col-span-2">
          <p className="text-sm font-semibold text-slate-500">
            Customer Records
          </p>

          {customerRecords.length === 0 ? (
            <p className="mt-4 text-sm text-slate-500">
              No customer records yet.
            </p>
          ) : (
            <div className="mt-5 overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    <th className="py-3 pr-4 font-semibold">Name</th>
                    <th className="py-3 pr-4 font-semibold">Email</th>
                    <th className="py-3 pr-4 font-semibold">Phone</th>
                    <th className="py-3 pr-4 font-semibold">Country</th>
                    <th className="py-3 pr-4 font-semibold">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {customerRecords.map((customer) => (
                    <tr
                      key={customer.id}
                      className="border-b border-slate-100 text-slate-700"
                    >
                      <td className="py-3 pr-4">{customer.fullName}</td>
                      <td className="py-3 pr-4">{customer.email}</td>
                      <td className="py-3 pr-4">{customer.phone}</td>
                      <td className="py-3 pr-4">{customer.country}</td>
                      <td className="py-3 pr-4">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => handleEditCustomer(customer)}
                            className="rounded-lg bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-600 hover:bg-blue-200"
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleDeleteCustomer(customer.id)
                            }
                            className="rounded-lg bg-red-100 px-3 py-1 text-xs font-semibold text-red-600 hover:bg-red-200"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm lg:col-span-2">
          <p className="text-sm font-semibold text-slate-500">
            What you are learning
          </p>

          <pre className="mt-5 overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-100">
            <code>{`const { data, loading, error } = useFetch(url);

if (loading) return "Loading...";
if (error) return error;

data.map((item) => (
  <Card key={item.id} />
));`}</code>
          </pre>

          <p className="mt-5 text-sm leading-7 text-slate-600">
            The API lab uses a custom hook to fetch remote data. This is how
            React apps connect to backend services while keeping UI components
            clean.
          </p>
        </div>
      </div>

      <Modal
        isOpen={selectedPost !== null}
        onClose={() => setSelectedPost(null)}
        title="API Record Details"
      >
        {selectedPost && (
          <>
            <div className="mb-4 flex items-center justify-between">
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                User {selectedPost.userId}
              </span>

              <span className="text-xs font-semibold text-slate-400">
                Post #{selectedPost.id}
              </span>
            </div>

            <h2 className="text-lg font-bold text-slate-900">
              {selectedPost.title}
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600">
              {selectedPost.body}
            </p>

            <pre className="mt-6 overflow-x-auto rounded-xl bg-slate-900 p-4 text-xs text-slate-100">
              <code>{JSON.stringify(selectedPost, null, 2)}</code>
            </pre>
          </>
        )}
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingCustomerId(null);
        }}
        title="Edit Customer Record"
      >
        <form onSubmit={handleCustomerFormSubmit} className="space-y-4">
          <input
            type="text"
            name="fullName"
            value={customerForm.fullName}
            onChange={handleCustomerFormChange}
            placeholder="Full name"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />

          <input
            type="email"
            name="email"
            value={customerForm.email}
            onChange={handleCustomerFormChange}
            placeholder="Email address"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />

          <input
            type="text"
            name="phone"
            value={customerForm.phone}
            onChange={handleCustomerFormChange}
            placeholder="Phone number"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />

          <select
            name="country"
            value={customerForm.country}
            onChange={handleCustomerFormChange}
            className="h-[48px] w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          >
            <option value="">Select country</option>
            <option value="Brunei">Brunei</option>
            <option value="Singapore">Singapore</option>
            <option value="Malaysia">Malaysia</option>
            <option value="Indonesia">Indonesia</option>
          </select>

          {formError && (
            <p className="rounded-xl bg-red-50 p-4 text-sm font-medium text-red-700">
              {formError}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Update Customer
          </button>
        </form>
      </Modal>

      <Drawer
        isOpen={drawerPost !== null}
        onClose={() => setDrawerPost(null)}
        title="API Drawer View"
      >
        {drawerPost && (
          <>
            <div className="mb-4 flex items-center justify-between">
              <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
                User {drawerPost.userId}
              </span>

              <span className="text-xs font-semibold text-slate-400">
                Post #{drawerPost.id}
              </span>
            </div>

            <h2 className="text-xl font-bold text-slate-900">
              {drawerPost.title}
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600">
              {drawerPost.body}
            </p>

            <div className="mt-6 rounded-2xl bg-slate-100 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Raw JSON
              </p>

              <pre className="mt-3 overflow-x-auto text-xs text-slate-700">
                <code>{JSON.stringify(drawerPost, null, 2)}</code>
              </pre>
            </div>
          </>
        )}
      </Drawer>
    </section>
  );
}