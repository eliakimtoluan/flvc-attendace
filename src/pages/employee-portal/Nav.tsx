import { supabase } from "@/App";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getInitials } from "@/lib/utils";
import { Profile } from "@/store/profile.store";
import { LogOutIcon } from "lucide-react";
import { EditEmployeeDialog } from "./EditEmployeeDialog";
import { useState } from "react";

const EmployeeNav = ({ profile }: { profile: Profile }) => {
  const fullName = `${profile?.first_name} ${profile?.last_name}`;
  const [open, setOpen] = useState(false);
  return (
    <>
      {open && (
        <EditEmployeeDialog data={profile} open={open} setOpen={setOpen} />
      )}
      <section className="overflow-hidden">
        <div>
          <div className="px-8 py-6 xl:py-0 bg-white border-b border-coolGray-100">
            <div className="flex items-center justify-between -m-2">
              <div className="flex flex-wrap items-center w-auto p-2">
                <a className="block max-w-max xl:mr-14" href="#">
                  <img
                    src="flex-ui-assets/logos/dashboard/flex-ui-black-green.svg"
                    alt=""
                  />
                </a>
                <ul className="hidden xl:flex flex-wrap">
                  <li className="mr-8">
                    <a
                      className="flex flex-wrap items-center py-8 text-base font-medium text-coolGray-500 text-green-500 border-b-2 border-transparentborder-green-500"
                      href="#"
                    >
                      <svg
                        className="mr-2"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 6C11.7348 6 11.4804 6.10536 11.2929 6.29289C11.1054 6.48043 11 6.73478 11 7V17C11 17.2652 11.1054 17.5196 11.2929 17.7071C11.4804 17.8946 11.7348 18 12 18C12.2652 18 12.5196 17.8946 12.7071 17.7071C12.8946 17.5196 13 17.2652 13 17V7C13 6.73478 12.8946 6.48043 12.7071 6.29289C12.5196 6.10536 12.2652 6 12 6ZM7 12C6.73478 12 6.48043 12.1054 6.29289 12.2929C6.10536 12.4804 6 12.7348 6 13V17C6 17.2652 6.10536 17.5196 6.29289 17.7071C6.48043 17.8946 6.73478 18 7 18C7.26522 18 7.51957 17.8946 7.70711 17.7071C7.89464 17.5196 8 17.2652 8 17V13C8 12.7348 7.89464 12.4804 7.70711 12.2929C7.51957 12.1054 7.26522 12 7 12ZM17 10C16.7348 10 16.4804 10.1054 16.2929 10.2929C16.1054 10.4804 16 10.7348 16 11V17C16 17.2652 16.1054 17.5196 16.2929 17.7071C16.4804 17.8946 16.7348 18 17 18C17.2652 18 17.5196 17.8946 17.7071 17.7071C17.8946 17.5196 18 17.2652 18 17V11C18 10.7348 17.8946 10.4804 17.7071 10.2929C17.5196 10.1054 17.2652 10 17 10ZM19 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.7956 22 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7956 22 19V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM20 19C20 19.2652 19.8946 19.5196 19.7071 19.7071C19.5196 19.8946 19.2652 20 19 20H5C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V19Z"
                          fill="currentColor"
                        />
                      </svg>
                      <p className="text-coolGray-800">Employee Dashboard</p>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="w-auto p-2">
                <div className=" xl:flex flex-wrap items-center -m-3">
                  <div className="w-auto p-3">
                    <div className="flex flex-wrap items-center -m-2">
                      <div
                        className="w-auto p-2 cursor-pointer"
                        onClick={() => setOpen(true)}
                      >
                        <div className="flex flex-wrap -m-2">
                          <div className="w-auto p-2">
                            <Avatar>
                              <AvatarImage src="" alt="@shadcn" />
                              <AvatarFallback>
                                {getInitials(fullName)}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                          <div className="w-auto p-2">
                            <h2 className="text-sm font-semibold text-coolGray-800">
                              {fullName}
                            </h2>
                            <p className="text-sm font-medium text-coolGray-500">
                              {profile?.email}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="w-auto p-2">
                        <Button
                          size={"sm"}
                          onClick={async () => {
                            await supabase.auth.signOut();
                          }}
                        >
                          <LogOutIcon />
                          Sign Out
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EmployeeNav;
