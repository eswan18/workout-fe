'use client';

import React, { useState, useEffect } from 'react';
import getCurrentUser from '@/app/_actions/getCurrentUser';

export default function useCurrentUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const user = await getCurrentUser();
      user && setUser(user);
    }
    fetchUser();
  }, []);

  return user;
}