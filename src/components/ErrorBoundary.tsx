import React from "react";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
  declare props: Props;
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: React.ErrorInfo) {
    console.error("Uncaught error in React tree:", error);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FAF8F5] text-[#1A2E26] flex flex-col items-center justify-center p-6 text-center font-sans">
          <div className="bg-white p-8 rounded-3xl border-2 border-[#D4AF37] shadow-xl max-w-md w-full space-y-4">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
              !
            </div>
            <h2 className="text-2xl font-bold text-[#0D472B]">
              সিস্টেম পুনরায় লোড করুন
            </h2>
            <p className="text-sm text-slate-600">
              সাইটটি লোড করতে সাময়িক সমস্যা হয়েছে। নিচের বাটনে ক্লিক করে
              ওয়েবসাইটটি রিফ্রেশ করুন।
            </p>
            <button
              onClick={() => {
                try {
                  localStorage.clear();
                } catch {}
                window.location.reload();
              }}
              className="w-full py-3 px-6 bg-[#0D472B] hover:bg-[#053B21] text-white font-bold rounded-xl border border-[#D4AF37] transition-all cursor-pointer"
            >
              রিফ্রেশ করুন (Reload Page)
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
