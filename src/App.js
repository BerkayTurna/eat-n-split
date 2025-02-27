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

  const [showAddFriend, setShowAddFriend] = useState(false);

  function handleShowAddFriend() {
    setShowAddFriend(!showAddFriend);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList />
        {showAddFriend && <FormAddFriend />}
        <Button onClick={handleShowAddFriend}>{showAddFriend ? 'Close' : 'Add Friend'}</Button>
      </div>
      <FormSplitBill />
    </div>
  )
}

function FriendList() {
  const friends = initialFriends;
  return <div>
    <ul>
      {friends.map(friend => (<Friend friend={friend} key={friend.id} />))}
    </ul>
  </div>
}

function Friend({ friend }) {
  return <li>
    <img src={friend.image} alt={friend.name} />
    <h3>{friend.name}</h3>

    {friend.balance < 0 && <p className="red">You owe {friend.name} ${Math.abs(friend.balance)}</p>}
    {friend.balance > 0 && <p className="green">{friend.name} owes you ${Math.abs(friend.balance)}</p>}
    {friend.balance === 0 && <p>You and {friend.name} are even.</p>}
    <Button>Select</Button>
  </li>
}
function Button({ children, onClick }) {
  return <button className="button" onClick={onClick}>{children}</button>
}
function FormAddFriend() {
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
  }
  return <form className="form-add-friend" onSubmit={handleSubmit}>
    <label>🤸‍♀️Friend name</label>
    <input type="text" value={name} onChange={event => setName(event.target.value)} />
    <label>🌅Image URL</label>
    <input type="text" value={image} onChange={event => setImage(event.target.value)} />
    <Button>Add</Button>
  </form>
}

function FormSplitBill() {
  return <form className="form-split-bill">
    <h2>SPLIT A BILL WITH X</h2>
    <label>💰 Bill Value</label>
    <input type="text" />

    <label>🫵 Your Expense</label>
    <input type="text" />

    <label>🧑‍💼 X's Expense</label>
    <input type="text" />

    <label>😝 Who is paying the bill</label>
    <select>
      <option value="user">You</option>
      <option value="friend">X</option>
    </select>
    <Button>Split Bill</Button>
  </form>
}