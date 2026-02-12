"use client";
import { useState } from "react";
import { X, Plus, Minus, Trash2, ShoppingBag, ClockIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";

const COLOR_HUE = {
  Variant1: "",
  Variant2: "hue-rotate-90",
  Variant3: "hue-rotate-180",
};

const CartDrawer = ({ isOpen, onClose }) => {
  const {
    cartItems,
    orderHistory,
    removeFromCart,
    updateQuantity,
    clearCart,
    placeOrder,
    cartTotal,
  } = useCart();

  const [activeTab, setActiveTab] = useState("cart");

  const handlePlaceOrder = () => {
    placeOrder();
    setActiveTab("history");
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-background shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab("cart")}
              className={`font-bold text-lg uppercase transition-colors ${
                activeTab === "cart"
                  ? "text-foreground border-b-2 border-foreground"
                  : "text-stone-400"
              }`}
            >
              Cart
              {cartItems.length > 0 && (
                <span className="ml-2 text-xs bg-black text-white rounded-full px-2 py-0.5">
                  {cartItems.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`font-bold text-lg uppercase transition-colors ${
                activeTab === "history"
                  ? "text-foreground border-b-2 border-foreground"
                  : "text-stone-400"
              }`}
            >
              History
              {orderHistory.length > 0 && (
                <span className="ml-2 text-xs bg-stone-200 text-stone-600 rounded-full px-2 py-0.5">
                  {orderHistory.length}
                </span>
              )}
            </button>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-stone-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart Tab */}
        {activeTab === "cart" && (
          <>
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center flex-1 gap-4 text-stone-400">
                <ShoppingBag size={64} />
                <p className="text-lg font-medium">Your cart is empty</p>
                <Button variant="outline" onClick={onClose}>
                  Browse Products
                </Button>
              </div>
            ) : (
              <>
                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={`${item.id}-${item.color}`}
                      className="flex gap-4 items-start"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className={`w-20 h-20 object-cover border rounded-sm flex-shrink-0 ${COLOR_HUE[item.color]}`}
                      />
                      <div className="flex flex-col flex-1 gap-1">
                        <p className="text-sm font-bold uppercase line-clamp-2">
                          {item.title}
                        </p>
                        <Badge variant="secondary" className="w-fit text-xs">
                          {item.color}
                        </Badge>
                        <p className="text-sm font-semibold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.color, item.quantity - 1)
                            }
                            className="w-6 h-6 rounded-full border flex items-center justify-center hover:bg-stone-100"
                          >
                            <Minus size={10} />
                          </button>
                          <span className="text-sm font-medium w-5 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.color, item.quantity + 1)
                            }
                            className="w-6 h-6 rounded-full border flex items-center justify-center hover:bg-stone-100"
                          >
                            <Plus size={10} />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id, item.color)}
                            className="ml-auto text-red-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="p-6 border-t space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold uppercase text-stone-600">
                      Total
                    </span>
                    <span className="text-xl font-bold">
                      ${cartTotal.toFixed(2)}
                    </span>
                  </div>
                  <Button className="w-full" onClick={handlePlaceOrder}>
                    Place Order
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </Button>
                </div>
              </>
            )}
          </>
        )}

        {/* Order History Tab */}
        {activeTab === "history" && (
          <>
            {orderHistory.length === 0 ? (
              <div className="flex flex-col items-center justify-center flex-1 gap-4 text-stone-400">
                <ClockIcon size={64} />
                <p className="text-lg font-medium">No order history yet</p>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {orderHistory.map((order) => (
                  <div key={order.id} className="border rounded-lg p-4 space-y-3">
                    {/* Order Header */}
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs text-stone-400">Order ID</p>
                        <p className="text-sm font-bold">#{order.id}</p>
                      </div>
                      <Badge variant="secondary">{order.status}</Badge>
                    </div>

                    <p className="text-xs text-stone-400">{order.date}</p>

                    <Separator />

                    {/* Order Items */}
                    <div className="space-y-2">
                      {order.items.map((item) => (
                        <div
                          key={`${item.id}-${item.color}`}
                          className="flex items-center gap-3"
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className={`w-10 h-10 object-cover border rounded-sm flex-shrink-0 ${COLOR_HUE[item.color]}`}
                          />
                          <div className="flex-1">
                            <p className="text-xs font-semibold uppercase line-clamp-1">
                              {item.title}
                            </p>
                            <p className="text-xs text-stone-400">
                              {item.color} × {item.quantity}
                            </p>
                          </div>
                          <p className="text-xs font-bold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    {/* Order Total */}
                    <div className="flex justify-between">
                      <span className="text-sm font-semibold uppercase text-stone-600">
                        Total
                      </span>
                      <span className="text-sm font-bold">
                        ${order.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default CartDrawer;