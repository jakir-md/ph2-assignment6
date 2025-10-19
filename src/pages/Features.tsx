import { useState } from "react";
import {
  Wallet,
  Users,
  Shield,
  CreditCard,
  Send,
  Download,
  Upload,
  History,
  User,
  Settings,
  BarChart3,
  Filter,
  Search,
  DollarSign,
  TrendingUp,
  Lock,
  CheckCircle,
  ArrowRight,
  Zap,
  Eye,
  UserCheck,
  Building2,
} from "lucide-react";
import { Link } from "react-router";
import { useGetMeQuery } from "@/redux/features/user/user.api";

const Features = () => {
  const { data: userData } = useGetMeQuery(undefined);
  const [activeTab, setActiveTab] = useState("user");

  const features = {
    user: {
      title: "User Dashboard",
      icon: <User className="w-8 h-8" />,
      color: "bg-rose-500 hover:bg-rose-600",
      description: "Complete financial control at your fingertips",
      items: [
        {
          icon: <BarChart3 className="w-6 h-6" />,
          title: "Smart Overview",
          description:
            "Real-time wallet balance, quick actions, and recent transactions in one glance",
        },
        {
          icon: <Upload className="w-6 h-6" />,
          title: "Easy Deposits",
          description:
            "Add money through agent cash-in simulation with instant confirmation",
        },
        {
          icon: <Download className="w-6 h-6" />,
          title: "Quick Withdrawals",
          description: "Withdraw your money anytime with secure verification",
        },
        {
          icon: <Send className="w-6 h-6" />,
          title: "Send Money",
          description:
            "Transfer funds to any user by searching phone number or email",
        },
        {
          icon: <History className="w-6 h-6" />,
          title: "Transaction History",
          description:
            "Complete history with pagination and smart filtering by type/date range",
        },
        {
          icon: <Settings className="w-6 h-6" />,
          title: "Profile Management",
          description: "Update your name, phone number, and password securely",
        },
      ],
    },
    agent: {
      title: "Agent Dashboard",
      icon: <Building2 className="w-8 h-8" />,
      color: "bg-rose-600 hover:bg-rose-700",
      description: "Powerful tools for financial service agents",
      items: [
        {
          icon: <TrendingUp className="w-6 h-6" />,
          title: "Agent Overview",
          description: "Cash-in/out summary and recent activity analytics",
        },
        {
          icon: <CreditCard className="w-6 h-6" />,
          title: "Add Money",
          description:
            "Securely add funds to any user's wallet with verification",
        },
        {
          icon: <Wallet className="w-6 h-6" />,
          title: "Process Withdrawals",
          description:
            "Handle user withdrawal requests efficiently and securely",
        },
        {
          icon: <Eye className="w-6 h-6" />,
          title: "Transaction Monitoring",
          description:
            "View and track all transactions handled by your agent account",
        },
        {
          icon: <DollarSign className="w-6 h-6" />,
          title: "Commission Tracking",
          description: "Monitor your earnings with detailed commission history",
        },
        {
          icon: <User className="w-6 h-6" />,
          title: "Agent Profile",
          description: "Manage your personal information and security settings",
        },
      ],
    },
    admin: {
      title: "Admin Dashboard",
      icon: <Shield className="w-8 h-8" />,
      color: "bg-rose-700 hover:bg-rose-800",
      description: "Complete system control and management",
      items: [
        {
          icon: <BarChart3 className="w-6 h-6" />,
          title: "System Overview",
          description:
            "Total users, agents, transaction count, and volume analytics",
        },
        {
          icon: <Users className="w-6 h-6" />,
          title: "User Management",
          description:
            "View, block, and unblock users with comprehensive controls",
        },
        {
          icon: <UserCheck className="w-6 h-6" />,
          title: "Agent Management",
          description: "Approve new agents and suspend accounts when necessary",
        },
        {
          icon: <Search className="w-6 h-6" />,
          title: "Advanced Search",
          description:
            "Powerful search bars and filters across all listing pages",
        },
        {
          icon: <Filter className="w-6 h-6" />,
          title: "Smart Filtering",
          description:
            "Filter by category, status, amount, and more with pagination",
        },
        {
          icon: <Settings className="w-6 h-6" />,
          title: "System Configuration",
          description: "Adjust fees, limits, and manage admin account settings",
        },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50/50 via-transparent to-rose-100/50 dark:from-rose-950/20 dark:via-transparent dark:to-rose-900/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="text-center mb-12 sm:mb-16">
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="p-3 sm:p-4 bg-rose-500 rounded-2xl shadow-lg">
                <Wallet className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-foreground mb-4 sm:mb-6">
              DigiWallet
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-6 sm:mb-8 max-w-3xl mx-auto px-2">
              Revolutionary digital wallet solution with comprehensive
              dashboards for users, agents, and administrators
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-6 text-sm text-muted-foreground">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500" />
                <span>Secure Transactions</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500" />
                <span>Real-time Processing</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500" />
                <span>Advanced Analytics</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 sm:mb-12">
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
          {Object.entries(features).map(([key, feature]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === key
                  ? `${feature.color} text-white shadow-lg transform scale-105`
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:scale-105 border"
              }`}
            >
              <div className="w-6 h-6 sm:w-8 sm:h-8">{feature.icon}</div>
              <span className="text-base sm:text-lg">{feature.title}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
        <div className="bg-card rounded-2xl sm:rounded-3xl border shadow-lg overflow-hidden">
          <div className={`${features[activeTab].color} p-6 sm:p-8 text-white`}>
            <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="w-6 h-6 sm:w-8 sm:h-8">
                {features[activeTab].icon}
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold">
                {features[activeTab].title}
              </h2>
            </div>
            <p className="text-lg sm:text-xl text-white/90">
              {features[activeTab].description}
            </p>
          </div>

          <div className="p-4 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {features[activeTab].items.map((item, index) => (
                <div
                  key={index}
                  className="group p-4 sm:p-6 bg-muted/50 rounded-xl border hover:bg-muted/70 hover:border-rose-200 dark:hover:border-rose-800 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-md"
                >
                  <div className="inline-flex p-2 sm:p-3 rounded-xl bg-rose-500 text-white mb-3 sm:mb-4 group-hover:bg-rose-600 group-hover:scale-110 transition-all duration-300">
                    <div className="w-5 h-5 sm:w-6 sm:h-6">{item.icon}</div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="mt-3 sm:mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="bg-card rounded-3xl border shadow-lg p-8">
          <h3 className="text-3xl font-bold text-foreground text-center mb-12">
            Powerful Features Across All Dashboards
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex p-4 bg-rose-500 rounded-2xl mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-foreground mb-2">
                Real-time
              </h4>
              <p className="text-muted-foreground">
                Instant transaction processing
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex p-4 bg-rose-600 rounded-2xl mb-4">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-foreground mb-2">
                Secure
              </h4>
              <p className="text-muted-foreground">
                Bank-level security protocols
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex p-4 bg-rose-700 rounded-2xl mb-4">
                <Filter className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-foreground mb-2">
                Advanced
              </h4>
              <p className="text-muted-foreground">
                Smart filtering & pagination
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex p-4 bg-rose-800 rounded-2xl mb-4">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-foreground mb-2">
                Analytics
              </h4>
              <p className="text-muted-foreground">
                Comprehensive reporting tools
              </p>
            </div>
          </div>
        </div>
      </div>

      {!userData && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24 text-center">
          <div className="bg-rose-500 rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-white">
            <h3 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6">
              Ready to Transform Digital Payments?
            </h3>
            <p className="text-lg sm:text-xl text-rose-50 mb-6 sm:mb-8 px-2">
              Experience the future of digital wallet management with
              DigiWallet's comprehensive dashboard system.
            </p>
            <Link
              to="/register"
              className="w-full sm:w-auto bg-white text-rose-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:bg-gray-50 transition-colors duration-300 hover:scale-105 transform shadow-lg"
            >
              Get Started Today
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Features;
