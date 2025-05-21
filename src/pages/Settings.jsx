import { useEffect, useState } from "react";
import Sidebar from "../components/ui/Sidebar";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import apiClient from "../utils/axios";
import toast from "react-hot-toast";

const Settings = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    businessName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleGetMe = async () => {
    try {
      const {
        data: { data },
      } = await apiClient.get("/user");

      setFormData({
        name: data.name,
        email: data.email,
        businessName: data.businessName,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetMe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {
        data: { data },
      } = await apiClient.patch("/user", formData);

      setFormData(data);
    } catch (error) {
      toast.error("Gagal mengubah data diri");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 p-8 mt-4">
        <h1 className="text-2xl font-bold mb-6 px-10">Pengaturan</h1>

        <form onSubmit={handleSubmit} className="max-w-full px-10 mt-8">
          <label className="block text-sm font-semibold mb-1">
            Nama Pengguna
          </label>
          <Input
            name="name"
            placeholder="Masukan Nama Pengguna"
            value={formData.name}
            onChange={handleChange}
          />

          <label className="block text-sm font-semibold mb-1">Email</label>
          <Input
            type="email"
            name="email"
            placeholder="Masukan Email"
            disabled={true}
            value={formData.email}
            onChange={handleChange}
          />

          <label className="block text-sm font-semibold mb-1">Nama Usaha</label>
          <Input
            name="businessName"
            placeholder="Masukan Nama Usaha"
            value={formData.businessName}
            onChange={handleChange}
          />

          <div className="mt-6">
            <Button type="submit" variant="primary">
              Simpan
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
