'use client';
import { useState } from "react";

const sampleData = {
  ocd: [
    {
      id: 1,
      user: "@loopingthoughts",
      text: "Does anyone else have intrusive thoughts that make no sense but won’t go away?",
      reactions: { resonate: 12, support: 8, hug: 5 },
    },
    {
      id: 2,
      user: "@cleanbutnotclean",
      text: "I spent 3 hours today rechecking my locks. I hate this cycle.",
      reactions: { resonate: 18, support: 15, hug: 11 },
    },
  ],
  depression: [
    {
      id: 1,
      user: "@grayclouds",
      text: "I feel like I’m always tired no matter how much I sleep.",
      reactions: { resonate: 25, support: 10, hug: 7 },
    },
    {
      id: 2,
      user: "@justbreathing",
      text: "Haven’t showered in days. Trying to be proud that I brushed my teeth.",
      reactions: { resonate: 30, support: 20, hug: 14 },
    },
  ],
};

export default function CommunityFeed() {
  const [currentGroup, setCurrentGroup] = useState("ocd");
  const [posts, setPosts] = useState(sampleData[currentGroup]);

  const handleGroupChange = (group: string) => {
    setCurrentGroup(group);
    setPosts(sampleData[group]);
  };

  const handleReaction = (postId: number, type: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              reactions: {
                ...post.reactions,
                [type]: post.reactions[type as keyof typeof post.reactions] + 1,
              },
            }
          : post
      )
    );
  };

  return (
    <div style={{ background: "#EDE7F6", padding: 24, minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', fontSize: 32, fontWeight: 'bold', color: '#7C4DFF', marginBottom: 32 }}>Truly Open</h1>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 32 }}>
        {Object.keys(sampleData).map((group) => (
          <button
            key={group}
            onClick={() => handleGroupChange(group)}
            style={{
              padding: '8px 16px',
              borderRadius: 999,
              border: 'none',
              background: currentGroup === group ? '#7C4DFF' : '#B39DDB',
              color: 'white',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            {group.charAt(0).toUpperCase() + group.slice(1)}
          </button>
        ))}
      </div>
      <div style={{ maxWidth: 600, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
        {posts.map((post) => (
          <div
            key={post.id}
            style={{
              background: 'white',
              borderRadius: 16,
              padding: 16,
              boxShadow: '0 4px 8px rgba(0,0,0,0.05)'
            }}
          >
            <div style={{ color: '#7C4DFF', fontWeight: 500, fontSize: 14 }}>
              {post.user}
            </div>
            <p style={{ fontSize: 16, color: '#333', marginTop: 8 }}>{post.text}</p>
            <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
              <button onClick={() => handleReaction(post.id, 'resonate')}>💙 {post.reactions.resonate}</button>
              <button onClick={() => handleReaction(post.id, 'support')}>🤝 {post.reactions.support}</button>
              <button onClick={() => handleReaction(post.id, 'hug')}>🫂 {post.reactions.hug}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}