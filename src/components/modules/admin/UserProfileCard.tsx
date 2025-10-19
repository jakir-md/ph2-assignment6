import type { IUser } from "./profileTypes";

export default function UserProfileCard({ user }: { user: IUser }) {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-neutral-900 rounded-2xl shadow-lg space-y-6 border border-gray-200 dark:border-neutral-800 transition-colors">
      <div className="flex items-center md:flex-row flex-col gap-6">
        <img
          src={user.picture}
          alt={user.name}
          className="rounded-full h-25 w-25 border shadow dark:border-neutral-700"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{user.name}</h2>
          <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
          <p className="text-sm text-gray-400 dark:text-gray-500">Role: {user.role}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold text-gray-700 dark:text-gray-300">Phone</h3>
          <p className="text-gray-800 dark:text-gray-200">{user.phone}</p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-700 dark:text-gray-300">Address</h3>
          <p className="text-gray-800 dark:text-gray-200">{user.address}</p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-700 dark:text-gray-300">User NID</h3>
          <p className="text-gray-800 dark:text-gray-200">{user.userNID}</p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-700 dark:text-gray-300">Nominee</h3>
          <p className="text-gray-800 dark:text-gray-200">
            {user.nomineeName} ({user.nomineeNID})
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-700 dark:text-gray-300">Verified</h3>
          <p className="text-gray-800 dark:text-gray-200">
            {user.isVerified ? "✅ Yes" : "❌ No"}
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-700 dark:text-gray-300">Active Status</h3>
          <p className="text-gray-800 dark:text-gray-200">{user.isActive}</p>
        </div>
      </div>


      <div className="p-4 bg-gray-50 dark:bg-neutral-800 rounded-xl border border-gray-200 dark:border-neutral-700">
        <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">💳 Wallet</h3>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-1 md:gap-4">
          <div>
            <h4 className="font-semibold text-gray-700 dark:text-gray-300">Balance</h4>
            <p className="text-gray-800 dark:text-gray-200">
              ${user.walletId?.balance.toFixed(2)}
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 dark:text-gray-300">Status</h4>
            <p className="text-gray-800 dark:text-gray-200">{user.walletId?.status}</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 dark:text-gray-300">Wallet Phone</h4>
            <p className="text-gray-800 dark:text-gray-200">{user.walletId?.phone}</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 dark:text-gray-300">User ID</h4>
            <p className="text-gray-800 dark:text-gray-200">{user.walletId?.userId}</p>
          </div>
        </div>
      </div>

      <div className="text-sm text-gray-500 dark:text-gray-400">
        <p>Created: {new Date(user.createdAt).toLocaleString()}</p>
        <p>Updated: {new Date(user.updatedAt).toLocaleString()}</p>
      </div>
    </div>
  );
}
