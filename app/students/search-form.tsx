type SearchFormProps = {
  search?: string;
  major?: string;
  status?: string;
};

export default function SearchForm({
  search = "",
  major = "",
  status = "",
}: SearchFormProps) {
  return (
    <form
      method="GET"
      className="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
    >
      <div className="grid gap-4 md:grid-cols-4">
        {/* Search */}
        <div className="md:col-span-2">
          <label
            htmlFor="search"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            ค้นหา
          </label>

          <input
            id="search"
            name="search"
            type="text"
            defaultValue={search}
            placeholder="ค้นหารหัส หรือชื่อ..."
            className="w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>

        {/* Major */}
        <div>
          <label
            htmlFor="major"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            สาขา
          </label>

          <select
            id="major"
            name="major"
            defaultValue={major}
            className="w-full rounded-md border border-gray-300 px-3 py-2"
          >
            <option value="">ทุกสาขา</option>
            <option value="Computer and Information Science">Computer and Information Science</option>
            <option value="Artificial Intelligence and Data Science">Artificial Intelligence and Data Science</option>
            <option value="International Economics, Innovation and Sustainability">International Economics, Innovation and Sustainability</option>
            <option value="Sports and Exercise Science">Sports and Exercise Science</option>
            <option value="English for Business Communication">English for Business Communication</option>
            <option value="Tourism and Service Innovation">Tourism and Service Innovation</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label
            htmlFor="status"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            สถานะ
          </label>

          <select
            id="status"
            name="status"
            defaultValue={status}
            className="w-full rounded-md border border-gray-300 px-3 py-2"
          >
            <option value="">ทั้งหมด</option>
            <option value="active">กำลังศึกษา</option>
            <option value="inactive">พ้นสภาพ</option>
          </select>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
        >
          ค้นหา
        </button>

        <a
          href="/students"
          className="rounded-md border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-50"
        >
          ล้าง
        </a>
      </div>
    </form>
  );
}