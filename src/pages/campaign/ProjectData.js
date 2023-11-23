import TeamImg from "../../images/avatar/b-sm.jpg";
import TeamImg2 from "../../images/avatar/c-sm.jpg";
import TeamImg3 from "../../images/avatar/a-sm.jpg";
import TeamImg4 from "../../images/avatar/d-sm.jpg";

import { setDeadline } from "../../utils/Utils";

export const projectData = [
  {
    id: 1,
    avatarClass: "purple",
    title: "WebOne Campaign",
    subtitle: "CAMP77854442222",
    impr: "1459",
    click: "37",
    dbuz: "3500",
    totalTask: "93",
    checked: false,
    badge:'success',
    deadline: setDeadline(20), 
  },
  
];

export const teamList = [
  { value: "Abu Bin", label: "Abu Bin", theme: "purple" },
  { value: "Newman John", label: "Newman John", theme: "primary" },
  { value: "Milagros Betts", label: "Milagros Betts", theme: "purple" },
  { value: "Joshua Wilson", label: "Joshua Wilson", theme: "pink" },
  { value: "Ryu Duke", label: "Ryu Duke", theme: "orange" },
  { value: "Aliah Pitts", label: "Aliah Pitts", theme: "blue" },
];
