import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import InputField from "@/Components/InputField";

export default function Edit({ auth, project }) {
  const { data, setData, put, errors } = useForm({
    image: "",
    name: project.name || "",
    status: project.status || "", // Ensure status is correctly initialized
    description: project.description || "",
    due_date: project.due_date || "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    put(route("project.update", project.id));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Edit project "{project.name}"
          </h2>
        </div>
      }
    >
      <Head title="Projects"/>

      <pre className="text-white">{JSON.stringify(project)}</pre>
      <br/>
      <pre className="text-white">{JSON.stringify(data)}</pre>
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="overflow-auto"></div>
              <form
                onSubmit={onSubmit}
                className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
              >
                {project.image_path && (
                  <div className="mt-4">
                    <img src={project.image_path} alt="logo" className="w-64 "/>
                  </div>
                )}
                <InputField
                  id="project_image_path"
                  type="file"
                  name="image"
                  className="mt-1 block w-full"
                  onChange={(e) => setData("image", e.target.files[0])}
                  label="Project image"
                  error={errors.image}
                />
                <InputField
                  id="project_name"
                  type="text"
                  name="name"
                  value={data.name}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("name", e.target.value)}
                  label="Project name"
                  error={errors.name}
                  isFocused={true}
                />
                <InputField
                  id="project_description"
                  name="description"
                  value={data.description}
                  className="mt-1 block w-full h-40"
                  onChange={(e) => setData("description", e.target.value)}
                  label="Project Description"
                  error={errors.description}
                />
                <InputField
                  id="project_due_date"
                  type="date"
                  name="due_date"
                  value={data.due_date}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("due_date", e.target.value)}
                  label="Project Deadline"
                  error={errors.due_date}
                />
                <InputField
                  id="project_status"
                  type="select"
                  name="status"
                  value={data.status} // Ensure the status value is correctly set
                  className="mt-1 block w-full"
                  onChange={(e) => setData("status", e.target.value)}
                  label="Project Status"
                  error={errors.status}
                  options={[
                    {value: "pending", label: "Pending"},
                    {value: "in_progress", label: "In Progress"},
                    {value: "completed", label: "Completed"},
                  ]}
                />
                <div className="mt-4 text-right">
                  <Link
                    href={route("project.index")}
                    className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                  >
                    Cancel
                  </Link>
                  <button
                    className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
