const providerErrors = {
  userRejectedRequest: 4001,
  unauthorized: 4100,
  unsupportedMethod: 4200,
  disconnected: 4900,
  chainDisconnected: 4901,
};

export function parseErrorToUserReadableMessage(error) {
  let reason;

  if (error?.code) {
    switch (error.code) {
      case providerErrors.userRejectedRequest:
        return `The request was rejected. Try again and sign transaction.`;
      case providerErrors.unauthorized:
        return 'The requested account and/or method has not been authorized by the user.';
      case providerErrors.unsupportedMethod:
        return 'The requested method is not supported by this Ethereum provider.';
      case providerErrors.disconnected:
        return 'The provider is disconnected from all chains.';
      case providerErrors.chainDisconnected:
        return 'The provider is disconnected from the specified chain.';
    }
  }

  reason = error.reason ?? error?.data?.message ?? error.message ?? reason;

  if (error?.data?.message?.toLowerCase?.()?.includes('insufficient funds')) {
    return 'Insufficient funds. Please top up your wallet.';
  }

  return reason;
}
