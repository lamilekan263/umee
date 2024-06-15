import TokenTransferForm from "./component/TokenTransferForm";


export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-between pt-10 px-5 md:p-16 lg:p-24 ">
    
      <TokenTransferForm />
    </main>
  );
}
