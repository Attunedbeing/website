import React, { useState } from 'react';

// Review-site approval bar. Only renders on non-production hosts (branch
// previews, draft deploys), so the live site never shows it. Approving
// notifies Smooth Landings HQ (via a server-side function that holds the
// approval token) and triggers the invoice flow.

const APPROVAL_ENDPOINT = '/api/approve-review';

const isProduction = () => {
  const h = window.location.hostname;
  return h === 'attunedbeing.co' || h === 'www.attunedbeing.co';
};

export const ReviewApproval: React.FC = () => {
  const [state, setState] = useState<'idle' | 'confirming' | 'sending' | 'done' | 'error'>('idle');
  const [comment, setComment] = useState('');

  if (isProduction() || state === 'done') {
    return state === 'done' ? (
      <div style={barStyle}>
        <span style={{ fontWeight: 600 }}>Approved. Thank you!</span>
        <span style={{ opacity: 0.8, marginLeft: 8 }}>Fergus has been notified.</span>
      </div>
    ) : null;
  }

  const approve = async () => {
    setState('sending');
    try {
      const res = await fetch(APPROVAL_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment: comment || undefined }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState('done');
    } catch {
      setState('error');
    }
  };

  return (
    <div style={barStyle}>
      {state === 'idle' && (
        <>
          <span>
            <strong>Reviewing the new changes?</strong>{' '}
            <span style={{ opacity: 0.85 }}>If you're happy with everything, approve it here.</span>
          </span>
          <button style={buttonStyle} onClick={() => setState('confirming')}>
            Approve changes
          </button>
        </>
      )}
      {(state === 'confirming' || state === 'sending' || state === 'error') && (
        <>
          <input
            style={inputStyle}
            placeholder="Any comment for Fergus? (optional)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={state === 'sending'}
          />
          <button style={buttonStyle} onClick={approve} disabled={state === 'sending'}>
            {state === 'sending' ? 'Sending...' : state === 'error' ? 'Try again' : 'Confirm approval'}
          </button>
        </>
      )}
    </div>
  );
};

const barStyle: React.CSSProperties = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 9999,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 12,
  flexWrap: 'wrap',
  padding: '12px 16px',
  background: '#2F4F4F',
  color: '#E3DBD0',
  fontSize: 14,
  boxShadow: '0 -2px 12px rgba(0,0,0,0.25)',
};

const buttonStyle: React.CSSProperties = {
  background: '#C8D1C0',
  color: '#2F4F4F',
  border: 'none',
  borderRadius: 6,
  padding: '8px 16px',
  fontWeight: 600,
  cursor: 'pointer',
};

const inputStyle: React.CSSProperties = {
  padding: '8px 10px',
  borderRadius: 6,
  border: 'none',
  minWidth: 260,
  fontSize: 14,
};
