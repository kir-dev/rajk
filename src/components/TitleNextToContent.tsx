import SubTitle from "@/components/PageTitle/SubTitle";

export default function TitleNextToContent({title, content} : {title: string, content: string}) {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between w-full py-8 mx-auto container">
            <div className="w-2/3">
            
            <SubTitle text={title}></SubTitle>
            </div>
            <div className="w-full md:w-3/4">
                {content}
            </div>
        </div>
    );
}
