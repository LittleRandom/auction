// import { useQuery } from "@tanstack/react-query";
// import { useSupabase } from "@/hooks/use-supabase";
// import type { DatabaseImage, Tag, UserProfile } from "@/types/supabase-types";

// interface ImageDetails extends DatabaseImage {
//     tags: Tag[];
//     user_profiles: UserProfile;
// }

// export function useImage(id: string, options?: { initialData?: ImageDetails }) {
//     const supabase = useSupabase();

//     return useQuery({
//         queryKey: ["image", id],
//         queryFn: async () => {
//             const { data, error } = await supabase
//                 .from("images")
//                 .select(`
//           *,
//           tags:image_tags(tags(*)),
//           user_profiles!user_id(*)
//         `)
//                 .eq("id", id)
//                 .single();

//             if (error) throw error;
//             if (!data) throw new Error("Image not found");

//             // Transform the nested tags structure
//             const transformedData: ImageDetails = {
//                 ...data,
//                 tags: data.tags
//                     .map((t: { tags: Tag | null }) => t.tags)
//                     .filter((tag): tag is Tag => tag !== null),
//                 user_profiles: data.user_profiles[0]
//             };

//             return transformedData;
//         },
//         initialData: options?.initialData,
//         enabled: !!id,
//     });
// }