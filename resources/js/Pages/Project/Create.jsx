import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TableHeadding from "@/Components/TableHeadding";
import { Head, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";

export default function Create({ auth }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    image: "",
    name: "",
    status: "",
    description: "",
    due_date: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();

    post(route("project.create  "));
  };
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Create new project
          </h2>
        </div>
      }
    >
      <Head title="Projects"></Head>
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="overflow-auto"></div>
              <form
                onSubmit={onSubmit}
                className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
              >
                <div>
                  <InputLabel
                    htmlFor="project_image_path"
                    value="Project image"
                  />

                  <TextInput
                    id="project_image_path"
                    type="file"
                    name="image"
                    value={data.image}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("image", e.target.value)}
                  />
                  <InputError message={errors.image} className="mt-2" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
