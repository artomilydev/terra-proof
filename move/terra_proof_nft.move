module terra_proof::terra_proof_nft {
    use sui::object::{Self, UID, ID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use std::string::{Self, String};
    use sui::coin::{Self, Coin};
    use sui::sui::SUI;
    use sui::event;
    use sui::display;
    use sui::package;

    /// NFT struct representing a travel proof
    public struct TerraProofNFT has key, store {
        id: UID,
        name: String,
        description: String,
        metadata_url: String,
        location: String,
        date: String,
        category: String,
        price: u64,
        verification_score: u8,
        creator: address,
        is_listed: bool,
    }

    /// Marketplace listing
    public struct Listing has key {
        id: UID,
        nft_id: ID,
        seller: address,
        price: u64,
    }

    /// One-Time-Witness for the module
    public struct TERRA_PROOF_NFT has drop {}

    /// Events
    public struct NFTMinted has copy, drop {
        nft_id: ID,
        creator: address,
        name: String,
    }

    public struct NFTListed has copy, drop {
        nft_id: ID,
        seller: address,
        price: u64,
    }

    public struct NFTSold has copy, drop {
        nft_id: ID,
        seller: address,
        buyer: address,
        price: u64,
    }

    /// Initialize function - called once when module is published
    fun init(otw: TERRA_PROOF_NFT, ctx: &mut TxContext) {
        let publisher = package::claim(otw, ctx);
        
        let keys = vector[
            string::utf8(b"name"),
            string::utf8(b"description"),
            string::utf8(b"image_url"),
            string::utf8(b"location"),
            string::utf8(b"creator"),
        ];

        let values = vector[
            string::utf8(b"{name}"),
            string::utf8(b"{description}"),
            string::utf8(b"{metadata_url}"),
            string::utf8(b"{location}"),
            string::utf8(b"{creator}"),
        ];

        let mut display = display::new_with_fields<TerraProofNFT>(
            &publisher,
            keys,
            values,
            ctx
        );

        display::update_version(&mut display);
        transfer::public_transfer(display, tx_context::sender(ctx));
        transfer::public_transfer(publisher, tx_context::sender(ctx));
    }

    /// Mint a new TerraProof NFT
    public entry fun mint(
        name: vector<u8>,
        description: vector<u8>,
        metadata_url: vector<u8>,
        location: vector<u8>,
        date: vector<u8>,
        category: vector<u8>,
        price: u64,
        verification_score: u8,
        ctx: &mut TxContext
    ) {
        let nft = TerraProofNFT {
            id: object::new(ctx),
            name: string::utf8(name),
            description: string::utf8(description),
            metadata_url: string::utf8(metadata_url),
            location: string::utf8(location),
            date: string::utf8(date),
            category: string::utf8(category),
            price,
            verification_score,
            creator: tx_context::sender(ctx),
            is_listed: false,
        };

        let nft_id = object::id(&nft);

        event::emit(NFTMinted {
            nft_id,
            creator: tx_context::sender(ctx),
            name: nft.name,
        });

        transfer::public_transfer(nft, tx_context::sender(ctx));
    }

    /// List NFT for sale
    public entry fun list_for_sale(
        nft: TerraProofNFT,
        price: u64,
        ctx: &mut TxContext
    ) {
        let nft_id = object::id(&nft);
        let seller = tx_context::sender(ctx);

        // Create listing
        let listing = Listing {
            id: object::new(ctx),
            nft_id,
            seller,
            price,
        };

        event::emit(NFTListed {
            nft_id,
            seller,
            price,
        });

        // Transfer NFT to listing (escrow)
        transfer::public_share_object(listing);
        transfer::public_transfer(nft, @0x0); // Lock NFT
    }

    /// Buy NFT from marketplace
    public entry fun buy_nft(
        listing: Listing,
        payment: Coin<SUI>,
        ctx: &mut TxContext
    ) {
        let Listing { id, nft_id, seller, price } = listing;
        
        // Verify payment amount
        assert!(coin::value(&payment) >= price, 0);

        // Transfer payment to seller
        transfer::public_transfer(payment, seller);

        event::emit(NFTSold {
            nft_id,
            seller,
            buyer: tx_context::sender(ctx),
            price,
        });

        object::delete(id);
    }

    /// Delist NFT from sale
    public entry fun delist(
        listing: Listing,
        ctx: &mut TxContext
    ) {
        let Listing { id, nft_id: _, seller, price: _ } = listing;
        
        // Only seller can delist
        assert!(tx_context::sender(ctx) == seller, 1);

        object::delete(id);
    }

    /// Get NFT details
    public fun get_nft_info(nft: &TerraProofNFT): (String, String, String, u64, u8) {
        (
            nft.name,
            nft.description,
            nft.location,
            nft.price,
            nft.verification_score
        )
    }

    /// Update NFT price
    public entry fun update_price(
        nft: &mut TerraProofNFT,
        new_price: u64,
        ctx: &mut TxContext
    ) {
        assert!(tx_context::sender(ctx) == nft.creator, 2);
        nft.price = new_price;
    }
}
