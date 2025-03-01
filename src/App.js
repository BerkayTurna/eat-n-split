import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleShowAddFriend() {
    setShowAddFriend(!showAddFriend);
  }

  function handleAddFriend(friend) {
    setFriends(friends => [...friends, friend])
    setShowAddFriend(false)
  }

  function handleSelection(friend) {
    setSelectedFriend((current) => current?.id === friend.id ?
      null : friend);
    setShowAddFriend(false)
  }
  function handleSplitBill(value) {
    setFriends(friends =>
      friends.map(friend =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedFriend(null);

  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friends={friends}
          onSelect={handleSelection}
          selectedFriend={selectedFriend} />

        {showAddFriend && <FormAddFriend onAddFriend=
          {handleAddFriend} />}

        <Button
          onClick={handleShowAddFriend}
        >{showAddFriend ? 'Close' : 'Add Friend'}</Button>
      </div>
      {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} onSplitBill={handleSplitBill} />}
    </div>
  )
}

function FriendList({ friends, onSelect, selectedFriend }) {
  return <div>
    <ul>
      {friends.map(friend => (<Friend friend={friend} key={friend.id} onSelect={onSelect} selectedFriend={selectedFriend} />))}
    </ul>
  </div>
}

function Friend({ friend, onSelect, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id
  return <li className={isSelected ? "selected" : ""}>
    <img src={friend.image} alt={friend.name} />
    <h3>{friend.name}</h3>

    {friend.balance < 0 && <p className="red">You owe {friend.name} ${Math.abs(friend.balance)}</p>}
    {friend.balance > 0 && <p className="green">{friend.name} owes you ${Math.abs(friend.balance)}</p>}
    {friend.balance === 0 && <p>You and {friend.name} are even.</p>}
    <Button onClick={() => onSelect(friend)}>{selectedFriend === friend ? "Close" : "Select"}</Button>
  </li>
}
function Button({ children, onClick }) {
  return <button className="button" onClick={onClick}>{children}</button>
}
function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("")
  const [image, setImage] = useState("https://i.pravatar.cc/48")

  function handleSubmit(event) {
    event.preventDefault()

    if (!name || !image) return;

    const id = crypto.randomUUID()
    const newFriend = {
      name,
      image: `${image}?=${id}`,
      balance: 0,
      id
    }
    onAddFriend(newFriend)
    setName("")
    setImage("https://i.pravatar.cc/48")
  }
  return <form className="form-add-friend" onSubmit={handleSubmit}>
    <label>🤸‍♀️Friend name</label>
    <input type="text" value={name} onChange={event => setName(event.target.value)} />
    <label>🌅Image URL</label>
    <input type="text" value={image} onChange={event => setImage(event.target.value)} />
    <Button>Add</Button>
  </form>
}

function FormSplitBill({ selectedFriend, onSplitBill }) {

  const [bill, setBill] = useState("")
  const [userExpense, setUserExpense] = useState("")
  const friendExpense = bill ? bill - userExpense : ""
  const [whoPays, setWhoPays] = useState("user")

  function handleSubmit(event) {
    event.preventDefault()

    if (!bill || !userExpense) return;
    onSplitBill(whoPays === "user" ? friendExpense : -userExpense)

  }

  return <form className="form-split-bill" onSubmit={handleSubmit}>
    <h2>SPLIT A BILL WITH {selectedFriend.name}</h2>
    <label>💰 Bill Value</label>
    <input
      type="text"
      value={bill}
      onChange={event => setBill(Number(event.target.value))} />

    <label>🫵 Your Expense</label>
    <input type="text"
      value={userExpense}
      onChange={event => setUserExpense(Number(event.target.value) > bill ? userExpense : Number(event.target.value))} />

    <label>🧑‍💼 {selectedFriend.name}'s Expense</label>
    <input type="text" disabled value={friendExpense} />

    <label>😝 Who is paying the bill</label>
    <select value={whoPays}
      onChange={event => setWhoPays(event.target.value)} >
      <option value="user">You</option>
      <option value="friend">{selectedFriend.name}</option>
    </select>
    <Button>Split Bill</Button>
  </form>
}