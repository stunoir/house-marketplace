import { useEffect, useState } from 'react'
import { collection, getDocs, query, where, orderBy, limit, startAfter } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import ListingItem from '../components/ListingItem'

function Offers() {
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // get reference
        const listingsRef = collection(db, 'listings')

        // create query
        const q = query(listingsRef, where('offer', '==', true), orderBy('timestamp', 'desc'), limit(10))

        // execute query
        const querySnap = await getDocs(q)

        let listings = []
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          })
        })

        setListings(listings)
        setLoading(false)
      } catch (error) {
        toast.error('Could not get the listings...')
      }
    }
    fetchListings()
  }, [])

  return (
    <div className='category'>
      <header>
        <p className='pageHeader'>Places on offer</p>
      </header>

      {loading ? (
        <Spinner></Spinner>
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className='categoryListings'>
              {listings.map((listing) => (
                <ListingItem key={listing.id} listing={listing.data} id={listing.id}></ListingItem>
              ))}
            </ul>
          </main>
        </>
      ) : (
        <p>No listings on offer</p>
      )}
    </div>
  )
}

export default Offers
