export const calculateElo = (Ra: number, Rb: number, K = 32) => {
  const Ea = 1 / (1 + Math.pow(10, (Rb - Ra) / 400));
  const Eb = 1 - Ea;

  const RaPrime = Ra + K * (1 - Ea);
  const RbPrime = Rb + K * (0 - Eb);

  return { RaPrime, RbPrime };
};
