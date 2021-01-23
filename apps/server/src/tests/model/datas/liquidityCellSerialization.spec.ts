import * as ckbUtils from '@nervosnetwork/ckb-sdk-utils';
import { CellInfoSerializationHolderFactory } from '../../../model';

test('serialized encoding and decoding args', () => {
  const lockScript: CKBComponents.Script = {
    args: '0x002610d6b2c1c8e95ea84616e94604232c274426',
    codeHash: '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8',
    hashType: 'type',
  };

  const typeHash = lockScript;

  const liquidity = {
    userLockHash: ckbUtils.scriptToHash(lockScript),
    version: 1,
    amount0: 100n,
    amount1: 100n,
  };

  const argsHex = CellInfoSerializationHolderFactory.getInstance()
    .getLiquidityCellSerialization()
    .encodeArgs(
      liquidity.userLockHash,
      liquidity.version,
      liquidity.amount0,
      liquidity.amount1,
      ckbUtils.scriptToHash(typeHash),
    );

  expect(CellInfoSerializationHolderFactory.getInstance().getLiquidityCellSerialization().decodeArgs(argsHex)).toEqual({
    ...liquidity,
    infoTypeHash: `0x${ckbUtils.scriptToHash(typeHash).slice(2, 42)}`,
  });
});

test('serialized encoding and decoding data', () => {
  const sudtAmount = 1000n;
  const dataHex = CellInfoSerializationHolderFactory.getInstance()
    .getLiquidityCellSerialization()
    .encodeData(sudtAmount);
  expect(CellInfoSerializationHolderFactory.getInstance().getLiquidityCellSerialization().decodeData(dataHex)).toEqual(
    sudtAmount,
  );
});
