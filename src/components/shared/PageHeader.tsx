import { ChevronRight, CornerUpLeft, Plus } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
type TPageHeaderProps = {
  pageTitle?: string;
  createBtnPaht?: string;
  isBack?: boolean;
};
const PageHeader = ({ pageTitle, createBtnPaht, isBack }: TPageHeaderProps) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const splitedPathname = pathname.split("/");
  const pageName = splitedPathname[splitedPathname.length - 1];
  const breadcrumbItems = splitedPathname.filter((item) => item);

  return (
    <div className="flex justify-between items-center ">
      {pageTitle ? (
        <h2 className="text-[#343a40] text-2xl font-semibold font-roboto leading-9 capitalize">
          {pageTitle}
        </h2>
      ) : (
        <div>
          <h2 className="text-[#343a40] text-2xl font-semibold font-roboto leading-9 capitalize">
            {pathname === "/" ? "Dashboard" : pageName.split("-").join(" ")}
          </h2>
          <div className="flex gap-2 items-center text-sm font-normal">
            {pathname === "/" ? (
              <span className="flex items-center">
                <span className="capitalize">Dashboard</span>

                <ChevronRight size={14} className="ml-2" />
                <span>Home</span>
              </span>
            ) : (
              <>
                {breadcrumbItems.map((item, index) => (
                  <span key={index} className="flex items-center">
                    <span className="capitalize">{item.replace("-", " ")}</span>
                    {index !== breadcrumbItems.length - 1 && (
                      <ChevronRight size={14} className="ml-2" />
                    )}
                  </span>
                ))}
              </>
            )}
          </div>
        </div>
      )}

      {createBtnPaht ? (
        <Link to={createBtnPaht}>
          <Button>
            Create <Plus className="size-4 ml-1" />
          </Button>
        </Link>
      ) : isBack ? (
        <Button onClick={() => navigate(-1)} className="size-11 p-0">
          <CornerUpLeft className="size-5" />
        </Button>
      ) : (
        ""
      )}
    </div>
  );
};

export default PageHeader;
