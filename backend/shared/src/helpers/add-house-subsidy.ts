import * as admin from 'firebase-admin'

import { CPMMContract, CPMMMultiContract } from 'common/contract'
import { isProd } from 'shared/utils'
import {
  DEV_HOUSE_LIQUIDITY_PROVIDER_ID,
  HOUSE_LIQUIDITY_PROVIDER_ID,
} from 'common/antes'
import { getNewLiquidityProvision } from 'common/add-liquidity'

const firestore = admin.firestore()

export const addHouseSubsidy = (contractId: string, amount: number) => {
  return firestore.runTransaction(async (transaction) => {
    const newLiquidityProvisionDoc = firestore
      .collection(`contracts/${contractId}/liquidity`)
      .doc()

    const providerId = isProd()
      ? HOUSE_LIQUIDITY_PROVIDER_ID
      : DEV_HOUSE_LIQUIDITY_PROVIDER_ID

    const contractDoc = firestore.doc(`contracts/${contractId}`)
    const snap = await transaction.get(contractDoc)
    const contract = snap.data() as CPMMContract | CPMMMultiContract

    const { newLiquidityProvision, newTotalLiquidity, newSubsidyPool } =
      getNewLiquidityProvision(
        providerId,
        amount,
        contract,
        newLiquidityProvisionDoc.id
      )

    transaction.update(contractDoc, {
      subsidyPool: newSubsidyPool,
      totalLiquidity: newTotalLiquidity,
    } as Partial<CPMMContract>)

    transaction.create(newLiquidityProvisionDoc, newLiquidityProvision)
  })
}
