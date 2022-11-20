import { useEffect, useState } from 'react'

import { TiArrowBack } from 'react-icons/ti'
import { IoMdWallet } from 'react-icons/io'
import toast, { Toaster } from 'react-hot-toast'
import Link from 'next/link'

const style = {
  button: `mr-8 flex items-center py-2 px-12 rounded-lg cursor-pointer`,
  buttonIcon: `text-xl`,
  buttonText: `ml-2 text-lg font-semibold`,
}

const MakeOffer = ({ isListed, selectedNft, listings, marketPlaceModule }) => {
  const [selectedMarketNft, setSelectedMarketNft] = useState()
  const [enableButton, setEnableButton] = useState(false)

  useEffect(() => {
    if (!listings || isListed === 'false') return
      ; (async () => {
        setSelectedMarketNft(
          listings.find((marketNft) => marketNft.asset?.id === selectedNft.id)
        )
      })()
  }, [selectedNft, listings, isListed])

  useEffect(() => {
    if (!selectedMarketNft || !selectedNft) return
// set this tp true when logic in place
    setEnableButton(false)
  }, [selectedMarketNft, selectedNft])

  const confirmPurchase = (toastHandler = toast) =>
    toastHandler.success(`Purchase successful!`, {
      style: {
        background: '#04111d',
        color: '#fff',
      },
    })

  const buyItem = async (
    listingId = selectedMarketNft.id,
    quantityDesired = 1,
    module = marketPlaceModule
  ) => {
    console.log(listingId, quantityDesired, module, 'david')
    await module
      .buyoutDirectListing({
        listingId: listingId,
        quantityDesired: quantityDesired,
      })
      .catch((error) => console.error(error))

    confirmPurchase()
  }

  return (
    <div className="flex h-20 w-full items-center rounded-lg border border-[#151c22] bg-[#303339] px-12">
      <Toaster position="bottom-left" reverseOrder={false} />
      {isListed === 'true' ? (
        <>
          <div
            // onClick={() => {
            //   enableButton ? buyItem(selectedMarketNft.id, 1) : null
            // }}
            className={`${style.button} bg-black hover:bg-grey`}
          >
            <IoMdWallet className={style.buttonIcon} />
            <div className={style.buttonText}>Buy Now</div>
          </div>
        </>
      ) : (
        <div className={`${style.button} bg-[#2081e2] hover:bg-[#42a0ff]`}>
          <IoMdWallet className={style.buttonIcon} />
          <div className={style.buttonText} onClick={() => window.location = `mailto:sahib.bhatia@credera.co.uk?subject=Request to list nft with id ${selectedNft.id}&body=Requesting listing of ${selectedNft.id}`}>Request to List Item</div>
        </div>
      )}
      <div className={`${style.button} bg-[#2081e2] hover:bg-[#42a0ff]`}>
        <TiArrowBack className={style.buttonIcon} />
        <Link href="/collections/0xe2a0564572ebAFCAB06d896a3F83F5448a5e71e7">
          <div className={style.buttonText}> Head Back </div>
        </Link>
      </div>
    </div>
  )
}

export default MakeOffer