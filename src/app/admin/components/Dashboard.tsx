import { useEffect, useState } from "preact/hooks";
import { supabase } from "@/lib/supabase/browser";

export default function OnlineUsersPanel() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const channel = supabase.channel("online-users");

    channel.on("presence", { event: "sync" }, () => {
      const state = channel.presenceState();

      const list = Object.values(state)
        .flat()
        .map((u) => ({
          email: u.email,
          online_at: u.online_at
        }));

      setUsers(list);
    });

    channel.subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">
        Online Users ({users.length})
      </h2>

      <ul className="space-y-2">
        {users.map((u, i) => (
          <li
            key={i}
            className="flex justify-between border-b pb-2"
          >
            <span>{u.email}</span>
            <span className="text-sm text-gray-500">
              {new Date(u.online_at).toLocaleTimeString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}