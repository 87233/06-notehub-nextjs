import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import type { FetchNotesResponse } from "@/lib/api";

export default async function NotesPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery<FetchNotesResponse>({
    queryKey: ["notes", "", "created", 1],
    queryFn: () =>
      fetchNotes({
        search: "",
        page: 1,
        sortBy: "created",
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
