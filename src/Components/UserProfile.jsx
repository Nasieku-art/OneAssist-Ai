const getInitials = (fullName) => {
  if (!fullName) return "U";

  const nameParts = fullName.trim().split(/\s+/);
  if (nameParts.length === 0) return 'U';
  if (nameParts.length === 1) {
     return nameParts[0][0].toUpperCase();
  }
  const firstInitial = nameParts[0][0];
  const lastInitial = nameParts[nameParts.length - 1][0];
  
  
  return `${firstInitial}${lastInitial}`.toUpperCase();
};

function UserProfile({ fullName, onClick }) {
    return(
      <div 
        onClick={onClick}
        className="flex items-center justify-center w-10 h-10 font-semibold text-white bg-teal-900 rounded-full shadow-sm cursor-pointer select-none hover:bg-teal-700 transition-colors"
        title={fullName || 'User Profile'}
      >
        {getInitials(fullName)}
      </div>
    );
}

export default UserProfile;