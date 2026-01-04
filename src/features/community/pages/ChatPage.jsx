import React from "react";
import {
  Search,
  Bell,
  Settings,
  Hash,
  Lock,
  MoreVertical,
  Paperclip,
  Smile,
  BadgeCheck,
  Send,
  Info,
  Calendar,
  FileText,
  CheckCircle,
} from "lucide-react";

const ChatPage = () => {
  return (
    <div className="flex flex-col h-screen bg-white font-sans overflow-hidden">
      <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6 shrink-0 z-20">
        <div className="flex items-center gap-8 flex-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-green-100 text-green-700 flex items-center justify-center font-bold">
              N
            </div>
            <div>
              <h1 className="font-bold text-gray-900 leading-none">NACOS</h1>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider">
                Anchor University
              </p>
            </div>
          </div>

          <div className="relative w-full max-w-md hidden md:block">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for messages, students, or resources..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
            <a
              href="/student/dashboard"
              className="text-gray-500 hover:text-green-700 transition-colors"
            >
              Dashboard
            </a>
            <a
              href="/student/courses"
              className="text-gray-500 hover:text-green-700 transition-colors"
            >
              Academics
            </a>
            <a href="/student/community" className="text-green-700 font-bold">
              Community
            </a>
          </nav>

          <div className="h-6 w-px bg-gray-200 hidden lg:block"></div>

          <div className="flex items-center gap-3">
            <button className="relative text-gray-500 hover:text-gray-700">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-sm border border-orange-200">
              JA
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shrink-0">
          <div className="p-4">
            <h2 className="font-bold text-gray-900 mb-1">Channels</h2>
            <p className="text-xs text-gray-500">Select your level to chat</p>
          </div>

          <div className="flex-1 overflow-y-auto px-3 space-y-6">
            <div className="space-y-1">
              <ChannelItem name="100 Level - General" />
              <ChannelItem name="200 Level - General" />
              <ChannelItem
                name="300 Level - CS"
                sub="Computer Science"
                active
                count={5}
              />
              <ChannelItem name="400 Level - General" />
            </div>

            <div>
              <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 px-3">
                Private Groups
              </h3>
              <div className="space-y-1">
                <ChannelItem name="Project Group A" isPrivate />
                <ChannelItem name="Exco 2024" isPrivate />
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-gray-100 mt-auto">
            <div className="flex items-center gap-3 text-gray-500 hover:text-gray-900 cursor-pointer transition-colors">
              <Settings className="w-4 h-4" />
              <div className="text-xs">
                <p className="font-medium text-gray-900">Settings</p>
                <p>Notifications, Theme</p>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 flex flex-col min-w-0 bg-white relative">
          <div className="h-14 border-b border-gray-100 flex items-center justify-between px-6 shrink-0 bg-white">
            <div>
              <h2 className="font-bold text-gray-900 flex items-center gap-2 text-sm">
                <Hash className="w-4 h-4 text-green-600" />
                300 Level - Computer Science
              </h2>
              <p className="text-[10px] text-gray-500 mt-0.5">
                42 Online · 120 Members
              </p>
            </div>
            <div className="flex items-center gap-3 text-gray-400">
              <Info className="w-4 h-4 hover:text-gray-600 cursor-pointer" />
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-100">
            <DateDivider date="Today, October 24" />

            <Message
              user="David O."
              time="10:42 AM"
              avatar="D"
              text="Has the lecturer for CMP 301 arrived yet? I'm stuck in traffic at Iyana Ipaja."
            />

            <Message
              user="Sarah K."
              time="10:44 AM"
              avatar="S"
              text="Not yet. The class rep said he might be running a bit late. We are all waiting at the auditorium."
              reactions={["👍 2"]}
            />

            {/* Announcement Bubble */}
            <div className="flex gap-4 max-w-3xl">
              <div className="w-10 flex-shrink-0"></div>
              <div className="bg-green-50 border border-green-100 rounded-lg p-3 w-full flex items-start gap-3">
                <div className="p-1.5 bg-green-100 rounded-full text-green-700 mt-0.5">
                  <Bell className="w-3 h-3" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-green-700 uppercase mb-0.5">
                    Class Rep Announcement
                  </h4>
                  <p className="text-xs text-green-900 font-medium">
                    The CMP 301 class has been rescheduled to 2:00 PM today.
                    Please inform others.
                  </p>
                </div>
              </div>
            </div>

            <Message
             time="10:50 AM"
              user="You"              
              isMe
              swapHeader={true}
              text="Thanks for the update Sarah! I'll head to the library first then."
              read
            />

            <Message
              user="Michael T."
              time="11:05 AM"
              className="text-white"
              avatar="M"
              text="Guys, I found this PDF very useful for the upcoming test."
              attachment={{name: "CMP_301_Notes_Revised.pdf", size: "2.4 MB"}}
            />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-100 bg-white z-10">
            <div className="flex items-center gap-3 bg-gray-50 rounded-full px-4 py-2.5 border border-gray-200 focus-within:ring-2 focus-within:ring-green-100 focus-within:border-green-400 transition-all">
              <button className="text-gray-400 hover:text-gray-600">
                <Paperclip className="w-5 h-5" />
              </button>
              <input
                type="text"
                placeholder="Type a message to the class..."
                className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400"
              />
              <button className="text-gray-400 hover:text-gray-600">
                <Smile className="w-5 h-5" />
              </button>
              <button className="bg-green-600 text-white p-1.5 rounded-full hover:bg-green-700 transition-transform active:scale-95 shadow-sm">
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[10px] text-gray-300 text-center mt-2">
              Press Enter to send, Shift + Enter for new line
            </p>
          </div>
        </main>

        {/* --- RIGHT SIDEBAR: OFFICIAL BOARD --- */}
        <aside className="w-72 bg-white border-l border-gray-200 hidden xl:flex flex-col shrink-0">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
              <Bell className="w-4 h-4 text-green-600" /> Official Board
            </h3>
          </div>

          <div className="p-4 space-y-6 overflow-y-auto flex-1">
            {/* Yellow Card (Matches Screenshot) */}
            <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 relative">
              <div className="absolute top-3 right-3 text-yellow-500">
                <Lock className="w-3 h-3" />
              </div>
              <h4 className="text-[10px] font-bold text-yellow-600 uppercase mb-2 tracking-wide">
                Dues Payment
              </h4>
              <p className="text-xs text-yellow-900 leading-relaxed mb-3 font-medium">
                Departmental dues deadline is this Friday. Ensure you pay via
                the 'Payments' tab.
              </p>
              <button className="text-[12px] font-bold text-green-700 hover:underline flex items-center gap-1">
                Go to Payments →
              </button>
            </div>

            {/* gray Card */}
            <div className="bg-gray-100 border border-gray-100 rounded-xl p-4 relative">
              <h4 className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-3">
                Quick Access
              </h4>
              <div className="space-y-2">
                <button className="w-full flex items-center gap-3 p-3  hover:bg-gray-50 rounded-lg text-xs font-medium text-gray-700 transition-colors text-left  hover:border-gray-100">
                  <Calendar className="w-4 h-4 text-green-600" /> Exam Timetable
                </button>
                <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg text-xs font-medium text-gray-700 transition-colors text-left  hover:border-gray-100">
                  <FileText className="w-4 h-4 text-green-600" /> Shared
                  Materials
                </button>
              </div>
            </div>

            {/* Members List */}
          {/* Members List */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  Members
                </h4>
                <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">
                  120
                </span>
              </div>
              <div className="space-y-4">
                {/* Added hasBadge prop here */}
                <MemberItem name="James K." role="Class Rep" isOnline hasBadge />
                
                {/* Others remain normal */}
                <MemberItem name="Anita R." isOnline />
                <MemberItem name="Chioma N." isOnline />
                <MemberItem name="Bola T." status="Offline 15m ago" />
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

// --- SUB COMPONENTS (Helpers) ---

const ChannelItem = ({name, sub, active, count, isPrivate}) => (
  <button
    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm mb-1 transition-all group ${
      active
        ? "bg-green-50 text-green-800 border border-green-100 shadow-sm"
        : "text-gray-600 hover:bg-gray-50 border border-transparent"
    }`}
  >
    <div className="flex items-start gap-2.5 overflow-hidden">
      <div
        className={`mt-0.5 ${
          active ? "text-green-600" : "text-gray-400 group-hover:text-gray-500"
        }`}
      >
        {isPrivate ? (
          <Lock className="w-3.5 h-3.5" />
        ) : (
          <Hash className="w-3.5 h-3.5" />
        )}
      </div>
      <div className="text-left truncate">
        <p
          className={`font-medium truncate ${
            active ? "text-green-900" : "text-gray-700"
          }`}
        >
          {name}
        </p>
        {sub && (
          <p className="text-[10px] text-green-800 group-hover:text-gray-500">
            {sub}
          </p>
        )}
      </div>
    </div>
    {count && (
      <span className="bg-green-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm">
        {count}
      </span>
    )}
  </button>
);

const Message = ({
  user,
  time,
  text,
  avatar,
  isMe,
  read,
  swapHeader,
  attachment,
  reactions,
}) => (
  <div className={`flex gap-3 ${isMe ? "flex-row-reverse" : ""}`}>
    <div
      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
        isMe ? "bg-gray-800 text-white" : "bg-orange-100 text-orange-700"
      }`}
    >
      {isMe ? "You" : avatar}
    </div>

    <div className={`max-w-[75%] ${isMe ? "items-end flex flex-col" : ""}`}>
      {/* 2. Added logic here to swap order if swapHeader is true */}
      <div
        className={`flex items-baseline gap-2 mb-1 ${
          swapHeader ? "flex-row-reverse" : ""
        }`}
      >
        <span className="text-xs font-bold text-gray-900">{user}</span>
        <span className="text-[10px] text-gray-400">{time}</span>
      </div>

      <div
        className={`p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
          isMe
            ? "bg-green-600 text-white rounded-tr-none"
            : "bg-gray-50 border border-gray-100 text-gray-700 rounded-tl-none"
        }`}
      >
        <p>{text}</p>

        {attachment && (
          <div className="mt-3 flex items-center gap-3 bg-white/10 border border-gray-200 p-2 rounded-lg">
            <div className="p-2 bg-white rounded flex items-center justify-center text-red-500 shadow-sm">
              <FileText className="w-4 h-4" />
            </div>
            <div className="overflow-hidden pr-2">
              <p className="font-bold text-xs truncate w-32">
                {attachment.name}
              </p>
              <p className="text-[10px] opacity-70">{attachment.size} · PDF</p>
            </div>
            <button className="opacity-70 hover:opacity-100">
              <Search className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <div className="mt-1 flex items-center gap-2">
        {reactions &&
          reactions.map((r, i) => (
            <span
              key={i}
              className="bg-white border border-gray-100 shadow-sm text-[10px] px-1.5 py-0.5 rounded-full text-gray-600"
            >
              {r}
            </span>
          ))}
        {isMe && read && (
          <span className="text-[10px] text-gray-300 flex items-center gap-1">
            Read <CheckCircle className="w-3 h-3" />
          </span>
        )}
      </div>
    </div>
  </div>
);

const MemberItem = ({name, role, isOnline, status, hasBadge}) => (
  <div className="flex items-center gap-3">
    <div className="relative">
      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600 border border-gray-200">
        {name.charAt(0)}
      </div>
      {isOnline && (
        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
      )}
    </div>
    <div>
      <div>
        <div className="flex items-center gap-1">
          <h4 className="text-xs font-bold text-gray-800">{name}</h4>
          {/* Only show badge if hasBadge is true */}
          {hasBadge && <BadgeCheck className="w-3 h-3 text-green-600" />}
        </div>

        {role && (
          <span className="text-[9px] font-bold text-green-700 bg-green-100 px-1.5 py-0.5 rounded-full inline-block mt-0.5">
            {role}
          </span>
        )}
      </div>
      
      {/* Hide the 'Online' text if the user has a badge */}
      {!hasBadge && (
        <p className="text-[10px] text-gray-400">
          {isOnline ? "Online" : status}
        </p>
      )}
    </div>
  </div>
);

const DateDivider = ({date}) => (
  <div className="flex items-center justify-center my-4">
    <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
      {date}
    </span>
  </div>
);

export default ChatPage;
