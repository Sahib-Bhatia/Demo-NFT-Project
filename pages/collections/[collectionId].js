import React from 'react'
import { useRouter } from 'next/router'
import { useEffect, useState, useMemo } from 'react'
import { useWeb3 } from '@3rdweb/hooks'
import { client } from '../../lib/sanityClient'
import { ThirdwebSDK } from '@3rdweb/sdk'
import Header from '../../components/Header'
import NFTCard from '../../components/NFTCard'
import { SiEthereum } from 'react-icons/si'

const style = {
  bannerImageContainer: `h-[20vh] w-screen overflow-hidden flex justify-center items-center`,
  bannerImage: `w-full object-cover`,
  infoContainer: `w-screen px-4`,
  midRow: `w-full flex justify-center text-white`,
  endRow: `w-full flex justify-end text-white`,
  profileImg: `w-40 h-40 object-cover rounded-full border-2 border-[#202225] mt-[-1rem]`,
  socialIconsContainer: `flex text-3xl mb-[-2rem]`,
  socialIconsWrapper: `w-44`,
  socialIconsContent: `flex container justify-between text-[1.4rem] border-2 rounded-lg px-2`,
  socialIcon: `my-2`,
  divider: `border-r-2`,
  title: `text-5xl font-bold mb-4`,
  createdBy: `text-lg mb-4`,
  statsContainer: `w-[44vw] flex justify-between py-4 border border-[#151b22] rounded-xl mb-4`,
  collectionStat: `w-1/4`,
  statValue: `text-3xl font-bold w-full flex items-center justify-center`,
  ethLogo: `h-6 mr-2`,
  statName: `text-lg w-full text-center mt-1`,
  description: `text-[#8a939b] text-xl w-max-1/4 flex-wrap mt-4`,
}

const Collection = () => {
  const router = useRouter()
  const { provider } = useWeb3()
  const { collectionId } = router.query
  const [ collection, setCollection] = useState({})
  const [nfts, setNfts] = useState([])
  const [listings, setListings] = useState([])

  const nftModule = useMemo(() => {
    if (!provider) return

    const sdk = new ThirdwebSDK(
      provider.getSigner(),
      'https://eth-goerli.g.alchemy.com/v2/d0FR5pYk-QiDU754JuPCQEibYHf5ftBr'
    )
    console.log('collectionId: ',collectionId)
    return sdk.getNFTModule(collectionId)
  }, [provider])

  // get all NFTs in the collection
  useEffect(() => {
    if (!nftModule) return
      ; (async () => {
        const nfts_result = await nftModule.getAll();
        setNfts(nfts_result);
      })()
  }, [nftModule])

  const marketPlaceModule = useMemo(() => {
    if (!provider) return

    const sdk = new ThirdwebSDK(
      provider.getSigner(),
      'https://eth-goerli.g.alchemy.com/v2/d0FR5pYk-QiDU754JuPCQEibYHf5ftBr'
    )
    return sdk.getMarketplaceModule(
      '0x232ea387AAc19141046A58e012cFFaBA9623BE61'
    )
  }, [provider])

  // get all listings in the collection
  useEffect(() => {
    if (!marketPlaceModule) return
      ; (async () => {
        setListings(await marketPlaceModule.getAllListings())
      })()
  }, [marketPlaceModule])

  const fetchCollectionData = async (sanityClient = client) => {
    const query = `*[_type == "marketItems" && contractAddress == "${collectionId}" ] {
      "imageUrl": profileImage.asset->url,
      "bannerImageUrl": bannerImage.asset->url,
      volumeTraded,
      createdBy,
      contractAddress,
      "creator": createdBy->userName,
      title, floorPrice,
      "allOwners": owners[]->,
      description
    }`

    const collectionData = await sanityClient.fetch(query);


    // the query returns 1 object inside of an array
    await setCollection(collectionData[0]);
  }

  useEffect(() => {
    fetchCollectionData()
  }, [collectionId])

  console.log('lisitngs: ', listings);
  console.log('nfts: ', nfts);

  return (
    <div className="overflow-hidden">
      <Header />
      <div className={style.infoContainer}>
        <div className={style.midRow}>
          <div className={style.title}>{collection?.title}</div>
        </div>
      </div>
      <div className={style.midRow}>
        <div className={style.createdBy}>Created By {' '}<span className='text-[#2081e2]'>{collection?.creator}</span></div>
      </div>
      <div className={style.midRow}>
        <div className={style.statsContainer}>
          <div className={style.collectionStat}>
            <div className={style.statValue}>{nfts.length}</div>
            <div className={style.statName}>items</div>
          </div>
          <div className={style.collectionStat}>
            <div className={style.statValue}>
              {collection?.allOwners ? collection.allOwners.length : ''}
            </div>
            <div className={style.statName}>Owners</div>
          </div>
          <div className={style.collectionStat}>
            <div className={style.statValue}>
              <SiEthereum />
              {collection?.floorPrice}
            </div>
            <div className={style.statName}>Floor Price</div>
          </div>
          <div className={style.collectionStat}>
            <div className={style.statValue}>
              <SiEthereum />
              {collection?.volumeTraded}K
            </div>
            <div className={style.statName}>Volume Traded</div>
          </div>
        </div>
      </div>
      <div className={style.midRow}>
        <div className={style.description}>{collection?.description}</div>
      </div>
      <div className= 'flex flex-wrap'>
        {nfts.map((nftItem, id) => {
          console.log('nfts');
          return <NFTCard key={id} nftItem={nftItem} title={collection?.title} listings={listings}/>
        })}
      </div>
    </div>
  )
}

export default Collection