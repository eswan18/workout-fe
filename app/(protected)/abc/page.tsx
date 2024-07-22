import { createClient } from "@/utils/supabase/server";

export default async function Page() {
  const supabase = createClient();
  const { data, error } = await supabase.from("profiles").select("*");

  console.log(data);
  console.log(error);
  return (
    <div>
      <h1>Page</h1>
    </div>
  );
}