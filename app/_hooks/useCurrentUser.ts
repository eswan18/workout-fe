'use client';

import React, { useState, useEffect } from 'react';
import getCurrentUser from '@/app/_actions/getCurrentUser';

export default function useCurrentUser() {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const currentUser = await getCurrentUser();
      console.log('got getCurrentUser', currentUser);
      currentUser && setUser(currentUser);
    }
    fetchUser();
  }, []);

  return user;
}