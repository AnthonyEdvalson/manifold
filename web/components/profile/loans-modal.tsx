import { Modal } from 'web/components/layout/modal'
import { Col } from 'web/components/layout/col'
import { PLURAL_BETS, User } from 'common/user'
import { ENV_CONFIG } from 'common/envs/constants'
import { LOAN_DAILY_RATE } from 'common/loans'
import { useHasReceivedLoanToday } from 'web/hooks/use-has-received-loan'

export function LoansModal(props: {
  user: User
  isOpen: boolean
  setOpen: (open: boolean) => void
}) {
  const { isOpen, user, setOpen } = props
  const hasReceivedLoanToday = useHasReceivedLoanToday(user)
  return (
    <Modal open={isOpen} setOpen={setOpen}>
      <Col className="bg-canvas-0 text-ink-1000 items-center gap-4 rounded-md px-8 py-6">
        <span className={'text-8xl'}>🏦</span>
        <span className="text-xl">Daily loans on your {PLURAL_BETS}</span>
        {hasReceivedLoanToday && (
          <span className={'text-ink-600 text-sm italic'}>
            You have already received your loan today. Come back tomorrow for
            {user.nextLoanCached > 0 &&
              ` ${ENV_CONFIG.moneyMoniker}${Math.floor(user.nextLoanCached)}!`}
          </span>
        )}
        <Col className={'gap-2'}>
          <span className={'text-primary-700'}>• What are daily loans?</span>
          <span className={'ml-2'}>
            Every day at midnight PT, you can get {LOAN_DAILY_RATE * 100}% of
            your total bet amount back as a loan. If your bet has depreciated in
            value, you will get {LOAN_DAILY_RATE * 100}% of the lower value.
          </span>
          <span className={'text-primary-700'}>
            • Do I have to pay back a loan?
          </span>
          <span className={'ml-2'}>
            Yes, don't worry! You will automatically pay back loans when the
            question resolves or you sell your bet.
          </span>
          <span className={'text-primary-700'}>
            • What is the purpose of loans?
          </span>
          <span className={'ml-2'}>
            Loans make it worthwhile to bet on questions that won't resolve for
            months or years, because your investment won't be locked up as long.
          </span>
          <span className={'text-primary-700'}>• What is an example?</span>
          <span className={'ml-2'}>
            For example, if you bet {ENV_CONFIG.moneyMoniker}1000 on "Will I
            become a millionaire?", you will get {ENV_CONFIG.moneyMoniker}
            {LOAN_DAILY_RATE * 1000} back tomorrow.
          </span>
          <span className={'ml-2'}>
            Previous loans count against your total invested amount. So on the
            next day, you would get back {LOAN_DAILY_RATE * 100}% of{' '}
            {ENV_CONFIG.moneyMoniker}(1000 - {LOAN_DAILY_RATE * 1000}) =
            {ENV_CONFIG.moneyMoniker}
            {LOAN_DAILY_RATE * (1000 - LOAN_DAILY_RATE * 1000)}.
          </span>
        </Col>
      </Col>
    </Modal>
  )
}
