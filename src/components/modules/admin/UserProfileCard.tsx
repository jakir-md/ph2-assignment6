import type { IUser } from "./profileTypes";

export default function UserProfileCard({ user }: { user: IUser }) {
  console.log("from card", user);
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg space-y-6">
      {/* Header */}
      <div className="flex items-center md:flex-row flex-col gap-6">
        <img
          src={user.picture}
          alt={user.name}
          className="rounded-full h-25 w-25 border shadow"
        />
        <div>
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-500">{user.email}</p>
          <p className="text-sm text-gray-400">Role: {user.role}</p>
        </div>
      </div>

      {/* Personal Info */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold text-gray-700">Phone</h3>
          <p>{user.phone}</p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-700">Address</h3>
          <p>{user.address}</p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-700">User NID</h3>
          <p>{user.userNID}</p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-700">Nominee</h3>
          <p>{user.nomineeName} ({user.nomineeNID})</p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-700">Verified</h3>
          <p>{user.isVerified ? "✅ Yes" : "❌ No"}</p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-700">Active Status</h3>
          <p>{user.isActive}</p>
        </div>
      </div>

      {/* Wallet Info */}
      <div className="p-4 bg-gray-50 rounded-xl border">
        <h3 className="text-lg font-bold mb-2">💳 Wallet</h3>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-1 md:gap-4">
          <div>
            <h4 className="font-semibold text-gray-700">Balance</h4>
            <p>${user.walletId.balance.toFixed(2)}</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700">Status</h4>
            <p>{user.walletId.status}</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700">Wallet Phone</h4>
            <p>{user.walletId.phone}</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700">User ID</h4>
            <p>{user.walletId.userId}</p>
          </div>
        </div>
      </div>

      {/* Meta Info */}
      <div className="text-sm text-gray-500">
        <p>Created: {new Date(user.createdAt).toLocaleString()}</p>
        <p>Updated: {new Date(user.updatedAt).toLocaleString()}</p>
      </div>
    </div>
  )
}
