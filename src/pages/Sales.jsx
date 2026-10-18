import React, { useState } from 'react';

const styles = {
  container: { color: '#1e293b', fontFamily: 'system-ui, sans-serif', padding: '16px', maxWidth: '1400px', margin: '0 auto' },
  header: { borderBottom: '2px solid #e2e8f0', paddingBottom: '16px', marginBottom: '24px' },
  title: { fontSize: '26px', fontWeight: '800', color: '#0f172a', margin: '0' },
  posLayout: { display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '32px' },
  section: { backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', height: 'fit-content', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' },
  sectionTitle: { fontSize: '15px', fontWeight: '700', color: '#1e293b', margin: '0 0 16px 0', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' },
  productGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px' },
  
  // प्रीमियम व्हाइट आइटम कार्ड
  itemCard: { backgroundColor: '#ffffff', border: '1px solid #e2e8f0', padding: '16px', borderRadius: '12px', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' },
  itemName: { fontSize: '14px', fontWeight: '700', color: '#0f172a', margin: '0 0 8px 0' },
  
  // साफ़ सुथरा इनवॉइस कार्ट
  cartRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid #f1f5f9', fontSize: '13px' },
  qtyBtn: { width: '28px', height: '28px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', margin: '0 8px', color: '#0f172a', transition: 'background 0.2s' },
  totalBox: { marginTop: '20px', paddingTop: '16px', borderTop: '2px dashed #e2e8f0' },
  printButton: { width: '100%', backgroundColor: '#10b981', color: '#ffffff', border: 'none', borderRadius: '10px', padding: '14px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', marginTop: '16px', transition: 'background 0.2s' }
};
export default function Sales({ products = [], setProducts, onNewSale }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const currentProduct = products.find(p => p.id === product.id);
    if (!currentProduct || currentProduct.stock <= 0) {
      alert("यह आइटम स्टॉक में नहीं है!");
      return;
    }

    const exist = cart.find(item => item.id === product.id);
    if (exist) {
      if (exist.qty >= currentProduct.stock) {
        alert("माफ़ कीजिये, इससे ज़्यादा स्टॉक उपलब्ध नहीं है!");
        return;
      }
      setCart(cart.map(item => item.id === product.id ? { ...exist, qty: exist.qty + 1 } : item));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const updateQty = (id, change) => {
    const currentProduct = products.find(p => p.id === id);
    setCart(currentCart => 
      currentCart.map(item => {
        if (item.id === id) {
          const newQty = item.qty + change;
          if (newQty <= 0) return null;
          if (newQty > currentProduct.stock) return item;
          return { ...item, qty: newQty };
        }
        return item;
      }).filter(Boolean)
    );
  };

  const handleCheckoutPrint = () => {
    if (cart.length === 0) return;

    const currentTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    // 1. मास्टर स्टॉक में से क्वांटिटी माइनस करना
    const updatedProducts = products.map(pItem => {
      const cartItem = cart.find(cItem => cItem.id === pItem.id);
      return cartItem ? { ...pItem, stock: pItem.stock - cartItem.qty } : pItem;
    });
    setProducts(updatedProducts);

    // 2. डैशबोर्ड के डेली सेल्स काउंटर में अमाउंट जोड़ने के लिए कॉलबैक (अगर प्रोप्स में भेजा गया हो)
    if (onNewSale) {
      onNewSale(currentTotal);
    }

    // प्रिंटर रसीद विंडो खोलना
    const printWindow = window.open('', '_blank', 'width=600,height=600');
    let itemsHTML = '';
    cart.forEach(item => {
      itemsHTML += `<div style="display:flex; justify-content:space-between; font-size:14px; margin:6px 0;"><span>${item.name} (x${item.qty})</span><span>₹${item.price * item.qty}</span></div>`;
    });

    const fullReceiptHTML = `
      <html>
        <body style="margin:20px; font-family:monospace; color: #111;">
          <div style="text-align:center; max-width:300px; margin:0 auto; border: 1px solid #ddd; padding: 15px; border-radius: 8px;">
            <h2 style="margin:0 0 5px 0;">🏪 NEXUS SHOP</h2>
            <small style="color:#666;">Live POS Billing</small>
            <hr style="border-top: 1px dashed #bbb; margin: 15px 0;">
            ${itemsHTML}
            <hr style="border-top: 1px dashed #bbb; margin: 15px 0;">
            <div style="display:flex; justify-content:space-between; font-weight:bold; font-size:16px;"><span>GRAND TOTAL:</span><span>₹${currentTotal}</span></div>
          </div>
          <script>window.onload = function() { window.print(); window.close(); }</script>
        </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(fullReceiptHTML);
    printWindow.document.close();
    
    // कार्ट खाली करें
    setCart([]);
    alert("बिल सफलतापूर्वक कट गया है और स्टॉक अपडेट हो गया है!");
  };

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>🛒 Live POS Billing Counter</h1>
      </header>
      
      <div style={styles.posLayout}>
        {/* Left: Items list box */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>📦 Available Items in Master Stock</h2>
          <div style={styles.productGrid}>
            {products.map(p => {
              const isOutOfStock = p.stock <= 0;
              return (
                <div 
                  key={p.id} 
                  onClick={() => !isOutOfStock && addToCart(p)} 
                  style={{ 
                    ...styles.itemCard,
                    opacity: isOutOfStock ? 0.5 : 1,
                    cursor: isOutOfStock ? 'not-allowed' : 'pointer',
                    backgroundColor: isOutOfStock ? '#f8fafc' : '#ffffff'
                  }}
                >
                  <h4 style={styles.itemName}>{p.name}</h4>
                  <div style={{ display: 'flex', justifycontent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                    <span style={{ color: '#10b981', fontWeight: '700' }}>₹{p.price}</span>
                    <span style={{ 
                      color: isOutOfStock ? '#ef4444' : '#64748b', 
                      fontSize: '11px',
                      fontWeight: '600',
                      backgroundColor: isOutOfStock ? '#fef2f2' : '#f1f5f9',
                      padding: '2px 6px',
                      borderRadius: '4px'
                    }}>
                      {isOutOfStock ? 'Out of stock' : `Stock: ${p.stock}`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Cart Invoice Invoice layout */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>📋 Customer Invoice Cart</h2>
          {cart.length === 0 ? (
            <p style={{ fontSize: '14px', color: '#64748b', textAlign: 'center', padding: '32px 0' }}>
              Your cart is empty. Click items to add.
            </p>
          ) : (
            <div>
              {cart.map(item => (
                <div key={item.id} style={styles.cartRow}>
                  <div>
                    <span style={{ fontWeight: '600', color: '#0f172a', display: 'block' }}>{item.name}</span>
                    <small style={{ color: '#64748b' }}>₹{item.price} per pc</small>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <button onClick={() => updateQty(item.id, -1)} style={styles.qtyBtn}>-</button>
                    <span style={{ fontWeight: '700', fontSize: '14px', minWidth: '20px', textAlign: 'center' }}>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, 1)} style={styles.qtyBtn}>+</button>
                  </div>
                  <span style={{ fontWeight: '700', color: '#0f172a', minWidth: '60px', textAlign: 'right' }}>
                    ₹{item.price * item.qty}
                  </span>
                </div>
              ))}
              
              <div style={styles.totalBox}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: '800', color: '#0f172a' }}>
                  <span>Grand Total:</span>
                  <span style={{ color: '#10b981' }}>₹{totalAmount}</span>
                </div>
                <button onClick={handleCheckoutPrint} style={styles.printButton}>
                  🖨️ Print Invoice & Deduct Stock
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
