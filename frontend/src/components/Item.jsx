const Item = ({name, email, phone, qualification, experience, skills }) => {
    return (
      <>
        <div className="bg-gray-20 flex border border-t-0 text-center">
          <h1 className="flex-1 px-4 py-2">{name}</h1>
          <h1 className="flex-1 px-4 py-2">{email}</h1>
          <h1 className="flex-1 px-4 py-2">{phone}</h1>
          <h1 className="flex-1 px-4 py-2">{qualification}</h1>
          <h1 className="flex-1 px-4 py-2">{experience}</h1>
          <h1 className="flex-2 px-4 py-2">{skills}</h1>
          <h1 className="flex-1 px-4 py-2">***</h1>
        </div>
      </>
    );
  };
  
  export default Item;