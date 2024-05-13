import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants";

import { Head, Link, router } from "@inertiajs/react";

export default function Index({ auth, projects, queryParms = null }) {
  queryParms = queryParms || {};
  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParms[name] = value;
    } else {
      delete queryParms[name];
    }

    router.get(route("project.index"), queryParms);
  };
  const onKeyPress = (name, e) => {
    if (e.key !== "Enter") return;
    searchFieldChanged(name, e.target.value);
  };

  const sortChanged = (name) => {
    if (name === queryParms.sort_field) {
      if (queryParms.sort_direction === "asc") {
        queryParms.sort_direction = "desc";
      } else {
        queryParms.sort_direction = "asc";
      }
    } else {
      queryParms.sort_field = name;
      queryParms.sort_direction = "asc";
    }
    router.get(route("project.index"), queryParms);
  };
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Projects
        </h2>
      }
    >
      <Head title="Projects" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="overflow-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead
                    className="w-full text-xs  text-gray-700 uppercase bg-gray-50 dark:bg-gray-700
                dark:text-gray-400 border-b-2 border-gray-500"
                  >
                    <tr className="text-nowrap">
                      <th
                        onClick={(e) => sortChanged("id")}
                        className="px-3 py-2"
                      >
                        ID
                      </th>
                      <th className="px-3 py-2">Image</th>
                      <th
                        onClick={(e) => sortChanged("name")}
                        className="px-3 py-2"
                      >
                        Name
                      </th>
                      <th
                        onClick={(e) => sortChanged("status")}
                        className="px-3 py-2"
                      >
                        Status
                      </th>
                      <th
                        onClick={(e) => sortChanged("created_at")}
                        className="px-3 py-2"
                      >
                        Create date
                      </th>
                      <th
                        onClick={(e) => sortChanged("due_date")}
                        className="px-3 py-2"
                      >
                        Due date
                      </th>
                      <th className="px-3 py-2">Created by</th>
                      <th className="px-3 py-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <thead
                    className="w-full text-xs  text-gray-700 uppercase bg-gray-50 dark:bg-gray-700
                dark:text-gray-400 border-b-2 border-gray-500"
                  >
                    <tr className="text-nowrap">
                      <th className="px-3 py-2"></th>
                      <th className="px-3 py-2"></th>
                      <th className="px-3 py-2">
                        <TextInput
                          className="w-full"
                          defaultValue={queryParms.name}
                          placeholder="Project Name"
                          onBlur={(e) =>
                            searchFieldChanged("name", e.target.value)
                          }
                          onKeyPress={(e) => onKeyPress("name", e)}
                        />
                      </th>
                      <th className="px-3 py-2">
                        <SelectInput
                          className="w-full"
                          defaultValue={queryParms.status}
                          onChange={(e) =>
                            searchFieldChanged("status", e.target.value)
                          }
                        >
                          <option value="">Select a status</option>
                          <option value="pending">Pending</option>
                          <option value="in_progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </SelectInput>
                      </th>
                      <th className="px-3 py-2"></th>
                      <th className="px-3 py-2"></th>
                      <th className="px-3 py-2"></th>
                      <th className="px-3 py-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.data.map((project) => (
                      <tr
                        className="bg-white dark:bg-gray-800
                    dark:border-gray-700 border-b"
                        key={project.id}
                      >
                        <td className="px-3 py-2">{project.id}</td>
                        <td className="px-3 py-2">
                          <img
                            src={project.image_path}
                            alt="img"
                            style={{ width: 60 }}
                          />
                        </td>
                        <td className="px-3 py-2">{project.name}</td>
                        <td className="px-3 py-2">
                          <span
                            className={
                              "px-2 py-1 rounded text-white " +
                              PROJECT_STATUS_CLASS_MAP[project.status]
                            }
                          >
                            {PROJECT_STATUS_TEXT_MAP[project.status]}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-nowrap">
                          {project.created_at}
                        </td>
                        <td className="px-3 py-2 text-nowrap">
                          {project.due_date}
                        </td>
                        <td className="px-3 py-2">{project.createdBy.name}</td>
                        <td className="px-3 py-2">
                          <Link
                            href={route("project.edit", project.id)}
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                          >
                            Edit
                          </Link>
                          <Link
                            href={route("project.edit", project.id)}
                            className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                          >
                            Delete
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Pagination links={projects.meta.links}></Pagination>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
