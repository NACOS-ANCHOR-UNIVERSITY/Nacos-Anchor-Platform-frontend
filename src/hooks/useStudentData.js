import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { studentService } from "../services/studentService";
import { authService } from "../services/authService";
import { toast } from "sonner"; // Assuming you use Sonner or React-Hot-Toast

// --- QUERY HOOKS (Fetching Data) ---

export const useEvents = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const { data } = await studentService.getEvents();
      return data.data; // Return the actual array
    },
  });
};

export const useLibrary = (filters) => {
  return useQuery({
    queryKey: ["library", filters], // Auto-refetch when filters change
    queryFn: async () => {
      const { data } = await studentService.getLibraryResources(filters);
      return data.data;
    },
  });
};

export const usePortfolio = () => {
  return useQuery({
    queryKey: ["portfolio"],
    queryFn: async () => {
      const { data } = await studentService.getPortfolio();
      return data.data;
    },
  });
};

// --- MUTATION HOOKS (Sending Data) ---

export const useLogin = () => {
  return useMutation({
    mutationFn: authService.login,
    onSuccess: (response) => {
      // Handle success in component usually, or here
      // Token saving is handled by the component calling useUserStore.getState().login(...)
    }
  });
};

export const useUploadProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: studentService.addProject,
    onSuccess: () => {
      toast.success("Project added successfully!");
      // Refresh the portfolio list automatically
      queryClient.invalidateQueries(["portfolio"]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Upload failed");
    }
  });
};