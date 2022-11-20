import React  from "react";

import Faq from "react-faq-component";

const data = {
    title: "FAQ",
    rows: [
        {
            title: "What is the purpose of this website?",
            content: `You can think of this website as a prototype for a NFT platform. You can authenticate using Metamask and then look at different NFTs available in the marketplace.`,
        },
        {
            title: "What is a NFT?",
            content:
                "Non-fungible tokens (NFTs) are cryptographic assets on a blockchain with unique identification codes and metadata that distinguish them from each other.Unlike cryptocurrencies, they cannot be traded or exchanged at equivalency. This differs from fungible tokens like cryptocurrencies, which are identical to each other and, therefore, can serve as a medium for commercial transactions.",
        },
        {
            title: "How can i buy NFTs?",
            content: `Many NFTs can only be purchased with Ether, so owning some of this cryptocurrency—and storing it in a digital wallet—is usually the first step. You can then purchase NFTs via any of the online NFT marketplaces, including OpenSea, Rarible, and SuperRare. `,
        },
        {
            title: "What is Metamask?",
            content: `MetaMask is a software cryptocurrency wallet used to interact with the Ethereum blockchain. It allows users to access their Ethereum wallet through a browser extension or mobile app, which can then be used to interact with decentralized applications`,
        },
        {
            title: "What is ThirdWeb?",
            content: `
            thirdweb is a platform that provides a suite of tools for creators, artists and entrepreneurs to easily build, launch and manage a Web3 project. thirdweb enables users to add features such as NFTs, marketplaces and social tokens to their Web3 projects without writing a line of code`,
        },
        {
            title: "What is the future of this website?",
            content: `The v2 of this website will let the users buy/sell nfts as well as have a news feed from twitter for easily accessible nft news for the users`,
        },
    ],
};

const faqStyles = {
    bgColor: 'transparent',
    titleTextColor: "Black",
    rowTitleColor: "White",
    rowContentColor: 'White',
    // arrowColor: "red",
};

const config = {
    animate: true,
    arrowIcon: "v",
    tabFocus: true
};


const style = {
    wrapper: `relative`,
    container: `before:content-[''] before:bg-red-500 before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU3OphSnzK2GmVgTeDB73AQacrlh83S0z2JQ&usqp=CAU')] before:bg-cover before:bg-center before:opacity-30 before:blur`,
    contentWrapper: `flex h-screen relative justify-center flex-wrap items-center`,
    copyContainer: `w-1/2`,
    questionSection: `cursor-pointer border-solid border-10 border-black`,
    questionAlign: `items-center flex text-left ml-2`,
    questionStyle: `text-base w-full`,
}

const Faqs = () => {
    return (
        <div className={style.wrapper} id="Faq">
            <div className={style.container}>
                <div className={style.contentWrapper}>
                    <div className={style.copyContainer}>
                        <Faq
                            data={data}
                            styles={faqStyles}
                            config={config}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Faqs
