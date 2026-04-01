import Int "mo:core/Int";
import Nat "mo:core/Nat";
import Order "mo:core/Order";
import Time "mo:core/Time";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import List "mo:core/List";
import Iter "mo:core/Iter";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  var iterOrderId : Nat = 1;

  type OrderDTO = {
    id : Nat;
    timestamp : Int;
    parentName : Text;
    phone : Text;
    childName : Text;
    schoolName : Text;
    class_ : Text;
    rollNumber : Text;
    day : Text;
    foodItem : Text;
    address : Text;
    status : Text;
  };

  let orders = Map.empty<Nat, OrderDTO>();

  module OrderDTO {
    public func compareByTimestamp(order1 : OrderDTO, order2 : OrderDTO) : Order.Order {
      Int.compare(order1.timestamp, order2.timestamp);
    };
  };

  public shared ({ caller }) func placeOrder(order : OrderDTO) : async Nat {
    let newOrder : OrderDTO = {
      order with
      id = iterOrderId;
      timestamp = Time.now();
      status = "pending";
    };
    orders.add(iterOrderId, newOrder);
    iterOrderId += 1;
    newOrder.id;
  };

  public shared ({ caller }) func deleteOrder(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete orders");
    };
    if (not orders.containsKey(id)) {
      Runtime.trap("Order with id " # id.toText() # " does not exist.");
    };
    orders.remove(id);
  };

  public shared ({ caller }) func markOrderAsDelivered(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can mark orders as delivered");
    };
    let order = switch (orders.get(id)) {
      case (null) { Runtime.trap("Order with id " # id.toText() # " does not exist.") };
      case (?order) { order };
    };
    if (order.status == "delivered") {
      Runtime.trap("Order is already marked as delivered.") : ();
    };
    let updatedOrder : OrderDTO = {
      order with
      status = "delivered";
    };
    orders.add(id, updatedOrder);
  };

  public shared ({ caller }) func deleteMultipleOrders(orderIds : [Nat]) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete orders");
    };
    for (orderId in orderIds.values()) {
      if (not orders.containsKey(orderId)) {
        Runtime.trap("Order with id " # orderId.toText() # " does not exist.");
      };
      orders.remove(orderId);
    };
  };

  public query ({ caller }) func getAllOrders() : async [OrderDTO] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view orders");
    };
    orders.values().toArray().sort(OrderDTO.compareByTimestamp);
  };

  public query ({ caller }) func getPendingOrders() : async [OrderDTO] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view orders");
    };
    orders.values().toArray().filter(func(order) { order.status == "pending" }).sort(OrderDTO.compareByTimestamp);
  };

  public query ({ caller }) func getDeliveredOrders() : async [OrderDTO] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view orders");
    };
    orders.values().toArray().filter(func(order) { order.status == "delivered" }).sort(OrderDTO.compareByTimestamp);
  };

  public query ({ caller }) func getOrderById(id : Nat) : async OrderDTO {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view orders");
    };
    switch (orders.get(id)) {
      case (null) { Runtime.trap("Order with id " # id.toText() # " does not exist.") };
      case (?order) { order };
    };
  };
};
