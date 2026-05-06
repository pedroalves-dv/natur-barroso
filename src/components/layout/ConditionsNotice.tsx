export default function ConditionsNotice({ message }: { message: string }) {
  return (
    <div className="absolute md:top-16 top-20 left-4 right-4 rounded-md z-10 md:top-24 md:left-auto md:right-7 md:w-auto md:max-w-xs bg-fog/20 text-granite text-sm px-4 py-3 border border-granite/10 backdrop-blur-sm">
      {message}
    </div>
  );
}
