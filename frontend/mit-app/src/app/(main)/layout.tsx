import React from "react";

const MainLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className="h-screen flex flex-col">
            <div className="bg-lime-200 flex-none h-12 p-3">ヘッダ</div>
            <main className="bg-slate-200 h-screen overflow-auto">{children}</main>
        </div>
    )
}

export default MainLayout