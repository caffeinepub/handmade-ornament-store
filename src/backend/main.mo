import Principal "mo:core/Principal";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Int "mo:core/Int";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";
import Float "mo:core/Float";

import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Type
  public type UserProfile = {
    name : Text;
    email : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  // User Profile Functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Product Type & Comparison
  type ProductId = Nat;
  type Product = {
    productId : ProductId;
    name : Text;
    description : Text;
    price : Float;
    imageUrl : Text;
    category : Text;
    inStock : Bool;
  };

  module Product {
    public func compare(product1 : Product, product2 : Product) : Order.Order {
      Nat.compare(product1.productId, product2.productId);
    };
  };

  // Products
  let products = Map.empty<ProductId, Product>();
  var nextProductId = 1;

  func getProductInternal(productId : ProductId) : Product {
    switch (products.get(productId)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) { product };
    };
  };

  public query ({ caller }) func getProducts() : async [Product] {
    products.values().toArray().sort();
  };

  public query ({ caller }) func getProduct(productId : ProductId) : async Product {
    getProductInternal(productId);
  };

  public shared ({ caller }) func addProduct(product : Product) : async ProductId {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add products");
    };
    let productId = nextProductId;
    let newProduct : Product = {
      product with
      productId;
    };
    products.add(productId, newProduct);
    nextProductId += 1;
    productId;
  };

  public shared ({ caller }) func updateProduct(productId : ProductId, product : Product) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update products");
    };
    let existing = getProductInternal(productId);
    let updatedProduct : Product = {
      product with
      productId;
    };
    products.add(productId, updatedProduct);
  };

  public shared ({ caller }) func deleteProduct(productId : ProductId) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete products");
    };
    ignore getProductInternal(productId);
    products.remove(productId);
  };

  // Newsletter Subscribers
  type Subscriber = {
    email : Text;
    subscribedAt : Int;
  };

  var nextSubscriberId = 0;
  let subscribers = Map.empty<Nat, Subscriber>();
  let emailToId = Map.empty<Text, Nat>();

  public shared ({ caller }) func addSubscriber(email : Text) : async Bool {
    // Public function - anyone can subscribe to newsletter, no auth check needed
    switch (emailToId.get(email)) {
      case (?existingId) { false };
      case (null) {
        let newSubscriber : Subscriber = {
          email;
          subscribedAt = Int.abs(Time.now());
        };
        let newId = nextSubscriberId;
        subscribers.add(newId, newSubscriber);
        emailToId.add(email, newId);
        nextSubscriberId += 1;
        true;
      };
    };
  };

  public query ({ caller }) func getSubscribers() : async [Subscriber] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can get subscribers");
    };
    subscribers.values().toArray();
  };

  // Seed Initial Products
  public type ProductInput = {
    name : Text;
    description : Text;
    price : Float;
    imageUrl : Text;
    category : Text;
    inStock : Bool;
  };

  public type ProductSeed = {
    productId : Nat;
    productInput : ProductInput;
  };

  let initialProducts = [
    {
      name = "Handmade Wooden Angel";
      description = "Beautifully carved wooden angel ornament.";
      price = 19.99;
      imageUrl = "https://example.com/images/angel.jpg";
      category = "Christmas";
      inStock = true;
    },
    {
      name = "Crochet Snowflake";
      description = "Delicate crochet snowflake for your tree.";
      price = 7.5;
      imageUrl = "https://example.com/images/snowflake.jpg";
      category = "Christmas";
      inStock = true;
    },
    {
      name = "Felt Reindeer";
      description = "Hand-stitched felt reindeer ornament.";
      price = 12.0;
      imageUrl = "https://example.com/images/reindeer.jpg";
      category = "Christmas";
      inStock = true;
    },
    {
      name = "Glass Star";
      description = "Hand-blown glass star ornament.";
      price = 22.5;
      imageUrl = "https://example.com/images/star.jpg";
      category = "Christmas";
      inStock = false;
    },
    {
      name = "Wooden Sleigh";
      description = "Miniature wooden sleigh ornament.";
      price = 15.0;
      imageUrl = "https://example.com/images/sleigh.jpg";
      category = "Christmas";
      inStock = true;
    },
    {
      name = "Crochet Bell";
      description = "Little red crochet bell ornament.";
      price = 9.99;
      imageUrl = "https://example.com/images/bell.jpg";
      category = "Christmas";
      inStock = true;
    },
    {
      name = "Gingerbread House";
      description = "Hand-painted gingerbread house ornament.";
      price = 17.0;
      imageUrl = "https://example.com/images/gingerbread.jpg";
      category = "Christmas";
      inStock = true;
    },
    {
      name = "Felt Santa";
      description = "Jolly felt Santa Claus ornament.";
      price = 13.5;
      imageUrl = "https://example.com/images/santa.jpg";
      category = "Christmas";
      inStock = true;
    },
  ];

  stable var persistentProducts: ?Map.Map<ProductId, Product> = null;

  // *** Save persistent state in preupgrade and restore in postupgrade ***
  system func preupgrade() {
    persistentProducts := ?products;
  };

  system func postupgrade() {
    switch (products.size()) {
      case (0) {
        for ((i, productInput) in initialProducts.enumerate()) {
          let newProduct : Product = {
            productInput with productId = i;
          };
          products.add(i, newProduct);
        };
      };
      case (_) {};
    };
  };
};
