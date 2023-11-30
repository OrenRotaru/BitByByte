import { useNavigate } from 'react-router-dom';
import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react"
import { useContext, createContext, useState } from "react"
import { ReactNode } from 'react';

interface SidebarContextType {
    expanded: boolean;
  }

const SidebarContext = createContext<SidebarContextType | null>(null);

interface SidebarProps {
    children: ReactNode;
  }

export default function Sidebar({ children }: SidebarProps) {
  const [expanded, setExpanded] = useState(true)
  
  return (
    <aside className="tw-h-screen">
      <nav className="tw-h-full tw-flex tw-flex-col tw-bg-white tw-border-r tw-shadow-sm">
        <div className="tw-p-4 tw-pb-2 tw-flex tw-justify-between tw-items-center">
          <img
            src="https://img.logoipsum.com/243.svg"
            className={`tw-overflow-hidden tw-transition-all ${
              expanded ? "tw-w-32" : "tw-w-0"
            }`}
            alt=""
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="tw-p-1.5 tw-rounded-lg tw-bg-gray-50 tw-hover:tw-bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="tw-flex-1 tw-px-3 tw-overflow-y-auto">{children}</ul>
        </SidebarContext.Provider>

        <div className="tw-border-t tw-flex tw-p-3">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt=""
            className="tw-w-10 tw-h-10 tw-rounded-md"
          />
          <div
            className={`
              tw-flex tw-justify-between tw-items-center
              tw-overflow-hidden tw-transition-all ${expanded ? "tw-w-52 tw-ml-3" : "tw-w-0"}
          `}
          >
            <div className="tw-leading-4">
              <h4 className="tw-font-semibold">John Doe</h4>
              <span className="tw-text-xs tw-text-gray-600">johndoe@gmail.com</span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  )
}

interface SidebarItemProps {
    id: string;
    icon: ReactNode;
    text: string;
    active: boolean;
    alert: boolean;
  }

export function SidebarItem({ id, icon, text, active, alert }: SidebarItemProps) {
  const context = useContext(SidebarContext)
  const navigate = useNavigate();

  const goToChannel = () => {
    navigate(`/home/channel/${id}`)
  }

  if (context === null) {
    // handle the case where the context is null
    // for example, you could return null or some default component
    return null;
  }
  const { expanded } = context;
  
  return (
    <li
      className={`
        tw-relative tw-flex tw-items-center tw-py-2 tw-px-3 tw-my-1
        tw-font-medium tw-rounded-md tw-cursor-pointer
        tw-transition-colors tw-group
        ${
          active
            ? "tw-bg-gradient-to-tr tw-from-indigo-200 tw-to-indigo-100 tw-text-indigo-800"
            : "tw-hover:bg-indigo-50 tw-text-gray-600"
        }
    `}
      onClick={goToChannel}
    >
      {icon}
      <span
        className={`tw-overflow-hidden tw-transition-all ${
          expanded ? "tw-w-52 tw-ml-3" : "tw-w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`tw-absolute tw-right-2 tw-w-2 tw-h-2 tw-rounded tw-bg-indigo-400 ${
            expanded ? "" : "tw-top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
          tw-absolute tw-left-full tw-rounded-md tw-px-2 tw-py-1 tw-ml-6
          tw-bg-indigo-100 tw-text-indigo-800 tw-text-sm
          tw-invisible tw-opacity-20 tw--translate-x-3 tw-transition-all
          tw-group-hover:visible tw-group-hover:opacity-100 tw-group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </li>
  )
}