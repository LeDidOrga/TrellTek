import { useState, useEffect } from 'react'
import { getListsOnBoard } from './api/listService.js'
import { getCardsOnList } from './api/cardService.js'

function Lists({ board }) {
  const [lists, setLists] = useState([])

  useEffect(() => {
    async function fetchListsAndCards() {
      if (!board) return

      const lists = await getListsOnBoard(board.id)
      for (const list of lists) {
        list.cards = await getCardsOnList(list.id)
      }
      setLists(lists)
    }
    fetchListsAndCards()
  }, [board])

  return (
    <div className="panel">
      <h2>Lists</h2>
      <button>Create New List</button>
      <div className='lists-container'>
        {lists.map((list) => (
          <div className="list" key={list.id}>
            <h3>{list.name}</h3>
            <ul>
              {list.cards.map((card) => (
                <li key={card.id}>{card.name}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Lists
